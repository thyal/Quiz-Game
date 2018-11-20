const express = require('express');
const Games = require('../models/games');
const Users = require('../models/users');

const router = express.Router();

router.post('/create', async (req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }

    const dto = req.body;
    let created;
    let randomplayers;
    
    if(dto.randomplayers) {
        randomplayers = 1;
    } else {
        randomplayers = 0;
    }
    try {
        created = await Games.createGame(req.user.id, dto.name, dto.numberOfQuestions, randomplayers);  
    } catch(error) {
        console.log(error);
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

router.get('/activeRandom', async (req, res) => {
    if(!req.user) {
        res.status(401).send();
        return;
    }

    let activeGame;

    try {
        activeGame = await Games.getActiveGameRandomPlayers();
    } catch(error) {
        return res.status(500);
    }
    if(!activeGame) {
        res.status(200).json(false);
    } else {
        res.status(200).json(activeGame);
    }

});

router.get('/isGameJoinable/:gameId', async (req, res) => {

    let response;
    try {
        response = await Games.checkIfGameIsJoinable(req.params.gameId);
    } catch(error) {
        return res.status(500);
    }

    res.status(200).json(response);
});

router.get('/leaderboard', async (req, res) => {
    let response;

    try {
        response = await Users.getLeaderboard();
    } catch(error) {
        return res.status(500);
    }

    res.status(200).json(response);
})

module.exports = router;