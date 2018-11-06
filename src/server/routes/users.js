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
})


module.exports = router;
