const socketIo = require('socket.io');
const Tokens = require('./tokens');

let io;

const start = (server) => {

    //start a WebSocket server besides the REST API from Express
    io = socketIo(server);

    io.on('connection', function(socket){
        console.log("a user connected");
    });
};


module.exports = {start};