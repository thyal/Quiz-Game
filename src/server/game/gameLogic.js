const Games = require('../models/games');

async function getGame(gameId) {
    let game;
    try {
        game = await Games.find(gameId);
    } catch(error) {
        return null;
    }
    return game;
}

async function startGame(gameId) {
    try {
        await Games.startGame(gameId);
    } catch(error) {
        return false;
    }
    return true;
}

async function endGame(gameId, winnerId) {
    try {
        await Games.endGame(gameId, winnerId);
    } catch(error) {
        return false;
    }
    return true;
}

async function joinGame(userId, gameId, isCreator, socketId) {
    try {
        await Games.joinGame(userId, gameId, isCreator, socketId)
    } catch(error) {
        return false;
    }
    return true;
}

async function getSocketIdForUser(userId, gameId) {
    return await Games.getSocketIdForUser(userId, gameId);
}

async function getUsernameFromSocketId(socketId, gameId) {
    return await Games.getUsernameFromSocketId(socketId, gameId);
}

async function getTotalNumberOfPlayersInGame(gameId) {
    return await Games.getNumberOfPlayersInGame(gameId);
}

async function provideQuestion() {

    let numberOfQuestions = await Games.getTotalNumberOfQuestions();
    let randomId = Math.floor(Math.random() * numberOfQuestions.total) + 1;
    let question = await Games.getOneQuestion(randomId);
    this.questionCounter++;
    return question;
}

async function provideAnswers(question_id) {
    return await Games.getAnswers(question_id);
}

async function checkAnswerAndCalculateScore(question_id, answer_id, time) {
    let answers = await Games.getAnswers(question_id);
    let points = 0;
    let maxTime = 20;

    for(answer of answers) {
        if(answer.isCorrect && answer_id === answer.id) {
            points += 10;
            let timeScore = maxTime - time;
            points += timeScore
        }
    }
    return points;
}

async function updateUserScore(userId, gameId, score) {
    try {
        await Games.updateUserScore(userId, gameId, score);
    } catch(error) {
        return false;
    }
    return true;
}

async function getUserScore(userId, gameId) {
    return await Games.getUserScore(userId, gameId);
}

async function getAllUsers(gameId) {
    return await Games.getUsersInGame(gameId);
}

async function playGame(io, gameId) {
    io.in(gameId).emit('starting');

    //Step one: start the game.
    let game;
    try {
        await startGame(gameId);
        game = await getGame(gameId);
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
        let question = await provideQuestion();
        io.in(gameId).emit('question', question);

        //We get the answers to said question and send them to the clients.
        let answers = await provideAnswers(question.id);
        io.in(gameId).emit('answers', answers);

        
        //Setting a timeout of 20 seconds. This is the time the players has to answer.
        await timeout(20000);

        //Figuring out which answer is the correct one.
        let correctAnswer = emitAnswer(answers);

        io.in(gameId).emit('roundOver', correctAnswer);

        //Getting all users in the game, and their updated scores.
        let users = await getAllUsers(gameId);

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
async function gameIsOver(io, gameId) {
    //Get all players in the game.
    let users = await getAllUsers(gameId);
    
    //The first user will always be the winner. This is because we order by user score 
    //when we get the users from the database. 
    let winner = users[0];
    await endGame(gameId, winner.user_id);

    //We send one event to the winner, and another one to all the others.
    io.to(winner.socket_id).emit('winner');

    for(let i = 1; i > users.length; i++) {
        io.to(users[i].socket_id).emit('notWinner');
    }
    
    io.in(gameId).emit('gameOver', winner);
}

module.exports = {
    getGame,
    startGame,
    joinGame,
    getSocketIdForUser,
    getUsernameFromSocketId,
    endGame,
    getTotalNumberOfPlayersInGame,
    provideQuestion,
    provideAnswers,
    updateUserScore,
    getUserScore,
    checkAnswerAndCalculateScore,
    getAllUsers,
    playGame,
}