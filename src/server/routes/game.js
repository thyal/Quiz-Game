const express = require('express');
const Games = require('../models/games');

const router = express.Router();

router.post('/create', async(req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }
    const dto = req.body;

    let created = await Games.createGame(req.user.id, req.body.name, req.body.numberOfQuestions);

    if(!created) {
        return res.status(500);
    }
    res.status(204).send();

});

module.exports = router;