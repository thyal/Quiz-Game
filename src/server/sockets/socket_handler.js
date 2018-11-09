const socketIo = require('socket.io');
const Tokens = require('./tokens');
const Games = require('../models/games');

let io;

const start = (server) => {


    io = socketIo(server);

    io.on('connection', (socket) => {
        
        //We expect each socket to send the gameId of the game they want to join when they connect.
        socket.on('game', async (payload) => {
            
            socket.join(payload.gameId);
            let joined;
            try {
                joined = await Games.joinGame(payload.userId, payload.gameId, 0);
            } catch(error) {
                console.log(error);
            }
            
            // if(!joined) {

            // }
            
            socket.to(payload.gameId).emit('newUser', payload.userId);
        });
    });
};


module.exports = {start};