const express = require('express');
const passport = require('passport');

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

module.exports = router;