const express = require('express');
const Games = require('../models/games');

const router = express.Router();

router.post('/create', async (req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }

    const dto = req.body;
    let created;

    try {
        created = await Games.createGame(req.user.id, dto.name, dto.numberOfQuestions);  
    } catch(error) {
        return res.status(500);
    }

    res.status(201).json(created.insertId);

});

router.get('/active', async (req, res) => {
    if(!req.user) {
        res.status(401).send();
        return;
    }

    let activeGames;

    try {
        activeGames = await Games.getActiveGames();
    } catch(error) {
        return res.status(500);
    }
    res.status(200).json(activeGames);

});

module.exports = router;