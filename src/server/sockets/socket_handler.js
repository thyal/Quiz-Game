const socketIo = require('socket.io');
const Tokens = require('./tokens');
const gameLogic = require('../game/gameLogic');

let io;

const start = (server) => {
    

    io = socketIo(server);

    io.on('connection', (socket) => {
        
        //We expect each socket to send the gameId of the game they want to join when they connect.
        socket.on('game', async (payload) => {
            const checkUser = Tokens.consumeToken(payload.token);
            
            if(checkUser !== payload.user_id) {
                socket.emit("error", "Invalid token");
                return;
            }
            //The user joins a room (a game). So we have an unique room for each game. 
            socket.join(payload.gameId);

            //We also save each user to a table consisting of the game id, user id, and scores.
            //We use this table both to keep track of which players is in which game, and their scores.
            try {
                await gameLogic.joinGame(payload.user_id, payload.gameId, 0, socket.id);
            } catch(error) {
                socket.to(payload.gameId).emit('error', 'Something went wrong');
            }
            socket.to(payload.gameId).emit('newUser', payload);
        });
        
        
        socket.on('startGame', async (gameId) => {
            playGame(gameId);
        });

        socket.on('answered', async (payload) => {
            let score = await gameLogic.checkAnswerAndCalculateScore(payload.question, payload.answer_id, payload.time);
            socket.emit("score", score);
            await gameLogic.updateUserScore(payload.user_id, payload.gameId, score);
        });

        socket.on('disconnect', () => {
            //Treat disconnect
        });

        async function playGame(gameId) {
            io.in(gameId).emit('starting');

            //Step one: start the game.
            let game;
            try {
                await gameLogic.startGame(gameId);
                game = await gameLogic.getGame(gameId);
            } catch(error) {
                io.in(gameId).emit('error', error);
            }

            let numberOfQuestions = game.numberOfQuestions;

            //Helper function to set a timeout.
            const timeout = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
            

            //THE GAME LOOP
            for(let i = 1; i <= numberOfQuestions; i++) {
                //We tell all clients a new round is starting.
                let round = {round: i, totalRounds: numberOfQuestions};
                io.in(gameId).emit('newRound', round);

                //We get a random question, and send it to the clients.
                let question = await gameLogic.provideQuestion();
                io.in(gameId).emit('question', question);

                //We get the answers to said question and send them to the clients.
                let answers = await gameLogic.provideAnswers(question.id);
                io.in(gameId).emit('answers', answers);
    
                
                //Setting a timeout of 20 seconds. This is the time the players has to answer.
                await timeout(20000);

                //Figuring out which answer is the correct one.
                let correctAnswer = emitAnswer(answers);

                io.in(gameId).emit('roundOver', correctAnswer);

                //Getting all users in the game, and their updated scores.
                let users = await gameLogic.getAllUsers(gameId);

                /*
                Here we are using a variable to keep track of the placement of each player.
                This works because we when we are getting the data from the database, we
                are ordering by score. That means the first user here will be in first place,
                and so on. We then send the total score of the game, and the placement to 
                each client.
                */
                let j = 0;
                for(user of users) {
                    j++;
                    const payload = {score: user.userScore, placement: j};
                    io.to(user.socket_id).emit('totalScore', payload);
                }

                //Sending leaderboard

                io.in(gameId).emit('leaderboard', users);

                //New timeout. need a few seconds after each round.
                await timeout(15000);
                
            }

            gameIsOver(gameId);


            function emitAnswer(answers) {
                let correctAnswer;
                for(answer of answers) {
                    if(answer.isCorrect) {
                        correctAnswer = answer;
                    }
                }
                return correctAnswer;
            }
        }

        //When the game is over. 
        async function gameIsOver(gameId) {
            //Get all players in the game.
            let users = await gameLogic.getAllUsers(gameId);
            
            //The first user will always be the winner. This is because we order by user score 
            //when we get the users from the database. 
            let winner = users[0];
            await gameLogic.endGame(gameId, winner.user_id);

            io.to(winner.socket_id).emit('winner');

            for(let i = 1; i > users.length; i++) {
                io.to(users[i].socket_id).emit('notWinner');
            }
            
            io.in(gameId).emit('gameOver', winner);
        }
    });
    
};

module.exports = {start};