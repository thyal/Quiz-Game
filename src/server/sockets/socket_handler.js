const socketIo = require('socket.io');
const Tokens = require('./tokens');

let io;

const start = (server) => {


    io = socketIo(server);

    io.on('connection', function(socket) {

        //We expect each socket to send the gameId of the game they want to join when they connect.
        socket.on('game', function(gameId) {
            console.log(gameId);
            socket.join(gameId);
        })
    });
};


module.exports = {start};