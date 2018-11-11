const Games = require('../models/games');

// class Match {
//     constructor(gameId, players) {
//         this.gameId = gameId;
//         this.players = players;
//     }


// }


async function getGame(gameId) {
    let game;
    try {
        game = await Games.find(gameId);
    } catch(error) {
        return null;
    }
    return game;
}

async function startGame(gameId) {
    try {
        await Games.startGame(gameId);
    } catch(error) {
        return false;
    }
    return true;
}

async function endGame(gameId) {
    try {
        await Games.endGame(gameId);
    } catch(error) {
        return false;
    }
    return true;
}

module.exports = {
    getGame,
    startGame,
    endGame
}