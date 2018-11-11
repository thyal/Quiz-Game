const Games = require('../models/games');

class Match {
    
    constructor(gameId, numberOfQuestions, players) {
        this.gameId = gameId;
        this.isFinished = false;
        this.numberOfQuestions = numberOfQuestions;
        this.questionCounter = 0;
    }

    async provideQuestion() {

        let numberOfQuestions = await Games.getTotalNumberOfQuestions();
        let randomId = Math.floor(Math.random() * numberOfQuestions.total) + 1;
        let question = await Games.getOneQuestion(randomId);
        this.questionCounter++;
        return question;
    }

    async provideAnswers(question_id) {
        let answers = await Games.getAnswers(question_id);

        return answers;
    }


    isGameFinished() {
        return this.questionCounter >= this.numberOfQuestions;
    }

    async doRound() {
        console.log(this.isGameFinished());
    }
}

module.exports = Match;