const db = require('./dbconnection');
const bcrypt = require('bcrypt');

function find(id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE id = ${id}`;

        db.query(sql, function(error, result, fields) {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

function insert(username, password) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO users(username, password) VALUES(${username}, ${password})`;

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
    insert
}