const Games = require('../models/games');

class Match {
    
    constructor(gameId, players, numberOfQuestions) {
        this.gameId = gameId;
        this.players = players;
        this.numberOfQuestions = numberOfQuestions;
        this.questionCounter = 0;
    }

    async provideQuestion() {
        // if(this.gameIsFinished) {
        //     return;
        // }

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


    gameIsFinished() {
        return this.questionCounter >= this.numberOfQuestions;
    }

}

module.exports = Match;