const express = require('express');
const passport = require('passport');
const Users = require('../models/users');

const router = express.Router(); 

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(204).send();
});

router.get('/user', (req, res) => {
    if(!req.user) {
        res.status(401).send();
        return;
    }
    res.status(200).json(req.user);
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let exsistingUser;
    try {
        exsistingUser = await Users.findOne(username);
    } catch(error) {
        res.status(500);
    }

    if(exsistingUser) {
        return res.status(409).json("A user with this username is already registered.");
    } else {
        const created = await Users.insertUser(username, password);

        if(!created){
            res.status(400).send();
            return;
        }
    
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
    
                res.status(204).send();
            });
        });
    }
});

router.post('/logout', function(req, res){

    req.logout();
    res.status(204).send();
});

module.exports = router;