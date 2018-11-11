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

            const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
            
            for(let i = 1; i <= numberOfQuestions; i++) {
                let answers = await questions(i);
                await timeoutPromise(20000);
                console.log(i);
                emitAnswer(answers);
                await timeoutPromise(5000);
            }


            async function questions(i) {
                return new Promise(async (resolve, reject) => {
                    let round = {round: i, totalRounds: numberOfQuestions};
                    io.in(gameId).emit('newRound', round);
                    let question = await gameLogic.provideQuestion();
                    io.in(gameId).emit('question', question);
                    let answers = await gameLogic.provideAnswers(question.id);
                    io.in(gameId).emit('answers', answers);
                    resolve(answers);
                });
            }

            async function emitAnswer(answers) {
                let correctAnswer;
                for(answer of answers) {
                    if(answer.isCorrect) {
                        correctAnswer = answer;
                    }
                }
                io.in(gameId).emit('roundOver', correctAnswer);
            }
        });
    });
    
};

module.exports = {start};