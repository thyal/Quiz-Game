const mysql = require('mysql');

let pool = mysql.createPool({
    host: 'fornaermet.mysql.domeneshop.no',
    port: 3306,
    user: 'fornaermet',
    password: 'emmj285Pdg7ZVYS',
    database: 'fornaermet'
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