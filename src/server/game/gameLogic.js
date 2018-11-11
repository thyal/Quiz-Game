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

async function provideQuestion() {

    let numberOfQuestions = await Games.getTotalNumberOfQuestions();
    let randomId = Math.floor(Math.random() * numberOfQuestions.total) + 1;
    let question = await Games.getOneQuestion(randomId);
    this.questionCounter++;
    return question;
}

async function provideAnswers(question_id) {
    let answers = await Games.getAnswers(question_id);

    return answers;
}

module.exports = {
    getGame,
    startGame,
    endGame,
    provideQuestion,
    provideAnswers
}