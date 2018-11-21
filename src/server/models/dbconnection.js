const mysql = require('mysql');

let pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3310,
    user: 'root',
    password: 'admin',
    database: 'quiz'
});

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err);
    } else {
        console.log("connected");
        connection.release();
    }
});

module.exports = pool;