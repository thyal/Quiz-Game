const express = require('express');
const router = express.Router();
const user = require('./../models/user');

router.get('/:id', async(req, res) => {
    let user_id = req.params.id;

    try {
        let response = await user.find(user_id);

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500);
    }
});

router.post('/', async(req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    try {
        let response = await user.insert(username, password);

        return res.status(200).json(response);
    } catch(error) {
        console.log(error);
        return res.status(500);
    }
});

router.post('/login', async(req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    let response;
    let correctPassword;

    try {
        response = await user.findIdOnUsername(username);
    } catch(error) {
        return res.status(500);
    }
    if(response === undefined) {
        return res.status(401).json("Wrong username");
    } else {
        try {
            let id = response.id;
            correctPassword = await user.comparePassword(id, password);

        } catch(error) {
            return res.status(500);
        }
        if(correctPassword) {
            return res.status(200).json("Success");
        } else {
            return res.status(401).json("Wrong password");
        }
    }
});


module.exports = router;
