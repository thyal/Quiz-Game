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

module.exports = {
    find,
    createGame,
    getActiveGames
}