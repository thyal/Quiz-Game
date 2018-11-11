const socketIo = require('socket.io');
const Tokens = require('./tokens');
const Games = require('../models/games');
const gameLogic = require('../game/gameLogic');
const Match = require('../game/match');

let io;

const start = (server) => {
    

    io = socketIo(server);

    io.on('connection', (socket) => {
        
        //We expect each socket to send the gameId of the game they want to join when they connect.
        socket.on('game', async (payload) => {
            
            //The user joins a room (a game). So we have an unique room for each game. 
            socket.join(payload.gameId);

            //We also save each user to a table consisting of the game id, user id, and scores.
            //We use this table both to keep track of which players is in which game, and their scores.
            try {
                await Games.joinGame(payload.user_id, payload.gameId, 0);
            } catch(error) {
                socket.to(payload.gameId).emit('error', 'Something went wrong');
            }
            socket.to(payload.gameId).emit('newUser', payload);
        });
        
        
        socket.on('startGame', async (gameId) => {
            
            io.in(gameId).emit('starting');

            //Step one: start the game.
            let game;
            try {
                await gameLogic.startGame(gameId);
                game = await gameLogic.getGame(gameId);
            } catch(error) {
                io.in(gameId).emit('error', error);
            }
            //Step two: start the round.
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

                //New timeout. need a few seconds after each round.
                await timeout(5000);
            }

            async function emitAnswer(answers) {
                let correctAnswer;
                for(answer of answers) {
                    if(answer.isCorrect) {
                        correctAnswer = answer;
                    }
                }
                return correctAnswer;
            }
        });
    });
    
};

module.exports = {start};