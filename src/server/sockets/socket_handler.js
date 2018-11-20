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

            //Authenticating with token.
            const checkUser = Tokens.consumeToken(payload.token);
            
            if(checkUser !== payload.user_id) {
                socket.emit("error", "Invalid token");
                return;
            }

            //The user joins a room (a game). So we have an unique room for each game. 
            socket.join(payload.gameId);
            

            //We also save each user to a table consisting of the game id, user id, scores, and socket id.
            //This is used to keep track of scores etc.
            try {
                await gameLogic.joinGame(payload.user_id, payload.gameId, 0, socket.id);
            } catch(error) {
                socket.to(payload.gameId).emit('error', 'Something went wrong');
            }

            //Here we find all the connected clients in a game. We then send an event back to
            //each socket in that room containing all the users that are connected in the game. 

            io.in(payload.gameId).clients(async (error, clients) => {
                if(error) throw error;
                let users = [];
                clients.forEach((client) => {
                    let user = connectedClients.get(client);
                    users.push(user);
                })
                io.in(payload.gameId).emit('users', users);
            });
        });
        
        //When the actual game is started. All the game logic is in the gameLogic file. 
        socket.on('startGame', async (gameId) => {
            gameLogic.playGame(io, gameId);
        });

        /*
        This is when a user answers. We check if it's the right answer, and calculate the 
        score based on the time it took from the round was started to the answer was submitted.
        You get 10 points for correct answer, and + 1 point for each second that is left of 
        the round
        */
        socket.on('answered', async (payload) => {
            let score = await gameLogic.checkAnswerAndCalculateScore(payload.question, payload.answer_id, payload.time);
            socket.emit("score", score);
            await gameLogic.updateUserScore(payload.user_id, payload.gameId, score);
        });

        /*
        Disconnect. We have to have a seperate function because we need to delete the user from
        the connected clients map, and update the user count. Since we need the gameId to do this
        it is not possible in the normal disconnect event. This will however be called right 
        after this, so that a player truly disconnects.
        */
        socket.on('leave', (gameId) => {
            connectedClients.delete(socket.id);
            
            io.in(gameId).clients(async (error, clients) => {
                if(error) throw error;
                let users = [];
                clients.forEach((client) => {
                    let user = connectedClients.get(client);
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