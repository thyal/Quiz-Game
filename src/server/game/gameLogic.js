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

async function endGame(gameId) {
    try {
        await Games.endGame(gameId);
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

module.exports = {
    getGame,
    startGame,
    joinGame,
    getSocketIdForUser,
    endGame,
    getTotalNumberOfPlayersInGame,
    provideQuestion,
    provideAnswers,
    updateUserScore,
    getUserScore,
    checkAnswerAndCalculateScore,
    getAllUsers
}