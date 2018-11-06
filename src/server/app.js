const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const Users = require('./models/users');
const auth = require('./routes/auth');

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'}, async (username, password, done) => {
        let user;
        try {
            user = await Users.findOne(username);

            if(!user) {
                return done(null, false, {message: 'Wrong username'});
            }
        } catch(error) {
            return done(error);
        }

        let passwordMatch;
        try {
            passwordMatch = await Users.comparePassword(user.id, password);
            if(!passwordMatch) {
                return done(null, false, {message: 'Wrong password'});
            }
        } catch(err) {
            return done(err);
        }

        return done(null, user);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (username, done) {

    const user = Users.findOne(username);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});


app.use(passport.initialize());
app.use(passport.session());
//routes
app.use('/api/auth', auth);

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;