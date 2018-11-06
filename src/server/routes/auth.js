const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), async(req, res) => {
    res.status(204).send();
});

router.get('/user', async(req, res) => {
    if(!req.user) {
        res.status(401).send();
        return;
    }
    console.log(req.user);
    res.status(200).json(req.user);
})

module.exports = router;