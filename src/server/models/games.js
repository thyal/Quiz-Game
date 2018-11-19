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

function createGame(user_id, name, numberOfQuestions, randomplayers) {
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO games(user_id, name, numberOfQuestions, randomplayers, created_at)
        VALUES(${user_id}, '${name}', ${numberOfQuestions}, ${randomplayers}, '${date}')`;

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

function getActiveGameRandomPlayers() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM games WHERE hasStarted = 0 AND isFinished = 0 AND randomplayers = 1`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    })
}

function checkIfGameIsJoinable(gameId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM games WHERE id = ${gameId} AND hasStarted = 0 AND isFinished = 0`;

        db.query(sql, function(error, result, fields) {
            resolve(result.length > 0);
        });
    }); 
}

function joinGame(user_id, game_id, isCreator, socket_id) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO userScores(user_id, game_id, userScore, isCreator, socket_id)
        VALUES(${user_id}, ${game_id}, 0, ${isCreator}, '${socket_id}')`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function getSocketIdForUser(user_id, game_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT socket_id FROM userScores WHERE user_id = ${user_id} AND game_id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    });
}

function getUsersInGame(game_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM vUserScores WHERE game_id = ${game_id} ORDER BY userScore DESC`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    })
}

function startGame(game_id) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE games SET hasStarted = 1 WHERE id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function endGame(game_id, winner_id) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE games 
        SET isFinished = 1, 
        winner_id = ${winner_id} 
        WHERE id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

/* QUESTIONS AND ANSWERS */

function getTotalNumberOfQuestions() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(id) AS total FROM questions`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    })
}


function getOneQuestion(question_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM vQuestions WHERE id = ${question_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    });
}

function getAnswers(question_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM answers WHERE question_id = ${question_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function getNumberOfPlayersInGame(game_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(user_id) FROM userScores WHERE game_id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    });
}

function updateUserScore(user_id, game_id, score) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE userScores SET userScore = userScore + ${score} 
        WHERE user_id = ${user_id} AND game_id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function getUserScore(user_id, game_id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT userScore FROM userScores
        WHERE user_id = ${user_id} AND game_id = ${game_id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result[0]);
        });
    });
}

module.exports = {
    find,
    createGame,
    getActiveGames,
    getActiveGameRandomPlayers,
    checkIfGameIsJoinable,
    joinGame,
    getSocketIdForUser,
    getUsersInGame,
    startGame,
    endGame,
    getTotalNumberOfQuestions,
    getOneQuestion,
    getAnswers,
    getNumberOfPlayersInGame,
    updateUserScore,
    getUserScore
}