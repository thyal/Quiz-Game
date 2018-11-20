const socketIo = require('socket.io');
const Tokens = require('./tokens');
const gameLogic = require('../game/gameLogic');

let io;

const start = (server) => {
    

    io = socketIo(server);
    
    let connectedClients = new Map();

    io.on('connection', (socket) => {

        //We expect each socket to send the gameId of the game they want to join when they connect.
        socket.on('game', async (payload) => {
        socket.user = payload;
        
        connectedClients.set(socket.id, payload);

            const checkUser = Tokens.consumeToken(payload.token);
            console.log("check: " + checkUser);
            
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

            io.in(payload.gameId).clients(async (error, clients) => {
                if(error) throw error;
                let users = [];
                clients.forEach((client) => {
                    let user = connectedClients.get(client);
                    users.push(user);
                })
                io.in(payload.gameId).emit('users', users);
            });
            //socket.to(payload.gameId).emit('newUser', payload);
        });
        
        //When the actual game is started. All the game logic is in the gameLogic file. 
        socket.on('startGame', async (gameId) => {
            gameLogic.playGame(io, gameId);
        });

        socket.on('answered', async (payload) => {
            let score = await gameLogic.checkAnswerAndCalculateScore(payload.question, payload.answer_id, payload.time);
            socket.emit("score", score);
            await gameLogic.updateUserScore(payload.user_id, payload.gameId, score);
        });

        socket.on('leave', (gameId) => {
            connectedClients.delete(socket.id);
            
            io.in(gameId).clients(async (error, clients) => {
                if(error) throw error;
                let users = [];
                clients.forEach((client) => {
                    let user = connectedClients.get(client);
                    console.log(user);
                    if(user !== undefined) {
                        users.push(user);
                    }
                });
                io.in(gameId).emit('users', users);
            });
        });

        socket.on('disconnect', () => {

        });

        
    });
    
};

module.exports = {start};