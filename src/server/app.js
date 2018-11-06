const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const users = require('./routes/users');

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

//routes
app.use('/api/users', users);

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;