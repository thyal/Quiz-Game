const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), async(req, res) => {
    res.status(204).send();
});

module.exports = router;