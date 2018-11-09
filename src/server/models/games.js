const db = require('./dbconnection');

function find(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM games WHERE id = ${id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    });
}

function createGame(user_id, name, numberOfQuestions) {
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO games(user_id, name, numberOfQuestions, created_at)
        VALUES(${user_id}, '${name}', ${numberOfQuestions}, '${date}')`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function getActiveGames() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM games WHERE hasStarted = 0 AND isFinished = 0`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function checkIfGameIsJoinable(gameId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM games WHERE id = ${gameId} AND hasStarted = 0 AND isFinished = 0`;

        db.query(sql, function(error, result, fields) {
            resolve(result.length > 0);
        });
    }); 
}

function joinGame(user_id, game_id, isCreator) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO userScores(user_id, game_id, userScore, isCreator)
        VALUES(${user_id}, ${game_id}, 0, ${isCreator})`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function getUsersInGame(game_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT user_id FROM userScores WHERE game_id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    })
}

module.exports = {
    find,
    createGame,
    getActiveGames,
    checkIfGameIsJoinable,
    joinGame,
    getUsersInGame
}