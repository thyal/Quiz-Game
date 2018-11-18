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
            gameLogic.playGame(io, gameId);
        });

        socket.on('answered', async (payload) => {
            let score = await gameLogic.checkAnswerAndCalculateScore(payload.question, payload.answer_id, payload.time);
            socket.emit("score", score);
            await gameLogic.updateUserScore(payload.user_id, payload.gameId, score);
        });

        socket.on('disconnect', () => {
            //Treat disconnect
        });

        
    });
    
};

module.exports = {start};