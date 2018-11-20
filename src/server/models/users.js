const db = require('./dbconnection');
const bcrypt = require('bcrypt');
const saltRounds = 12;

function find(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE id = ${id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            if(result.length > 0) {
                resolve(result[0]);
            }
            resolve(false);
        });
    });
}

function findOne(username) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE username = '${username}'`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            if(result.length > 0) {
                resolve(result[0]);
            }
            resolve(false);
        });
    });
}

function insertUser(username, password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(error, hash) {
            if(error) reject(error);
            let sql = `INSERT INTO users(username, password) VALUES('${username}', '${hash}')`;
    
            db.query(sql, function(error, result, fields) {
                if(error) {
                    console.log(error);
                    reject(error);
                }
                resolve(result);
            });
        });
    });
}

function updateWins(user_id) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE users SET wins = wins + 1 WHERE id = ${user_id}`;
    
        db.query(sql, function(error, result, fields) {
            if(error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    })
}

function comparePassword(id, password) {
    let sql = `SELECT password FROM users WHERE id = ${id}`;
    let hashedPassword;

    return new Promise((resolve, reject) => {
        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            hashedPassword = result[0].password;
    
            bcrypt.compare(password, hashedPassword, function(error, result) {
                if(result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    });
}

function getLeaderboard() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT username, wins FROM users ORDER BY wins DESC`;
        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        })
    })
}

module.exports = {
    find,
    findOne,
    updateWins,
    insertUser,
    comparePassword,
    getLeaderboard
}