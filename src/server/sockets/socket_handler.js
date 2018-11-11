const socketIo = require('socket.io');
const Tokens = require('./tokens');
const Games = require('../models/games');
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
            
            io.in(gameId).emit('starting', "game is starting");

            const match = new Match(gameId, "he", 10);
            try {
                let question = await match.provideQuestion();
                let answers = await match.provideAnswers(question.id);

                io.in(gameId).emit('question', question);
                
                setTimeout(() => {
                    io.in(gameId).emit('answers', answers);
                }, 5000);
                
                socket.on('answered', (payload) => {
                    console.log(payload);
                });

                setTimeout(() => {
                    io.in(gameId).emit('roundOver')
                }, 20000);

            } catch(error) {
                io.in(gameId).emit('error', error);
            }

            
        });
    });
    
};

module.exports = {start};