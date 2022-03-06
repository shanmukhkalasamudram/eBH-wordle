const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


router.post("/players", async function (req, res) {
    // get information of player from POST body data
    let { username, score, best_time } = req.body;
    const position = 0;

    // check if the username already exists
    const alreadyExisting = await User.findOne({ username: username });

    if (alreadyExisting) {
        res.send({ status: false, msg: "player username already exists" });
    } else {
        // create the new player
        await User.create({ username, score, best_time, position });
        console.log(`Created Player ${username}`);
        res.send({ status: true, msg: "player created" });
    }
});

router.put("/players", async function (req, res) {
    let { username, score, best_time } = req.body;
    let position = 0;
    // check if the username already exists
    const alreadyExisting = await User.findOne({ username: username });
    if (alreadyExisting) {
        // Update player object with the username
        await User.updateOne({ username }, { $set: { username, score, best_time, position } });
        console.log(`Player ${username} score updated to ${score}`);
        res.send({ status: true, msg: "player score updated" });
    } else {
        res.send({ status: false, msg: "player username not found" });
    }
});

router.delete("/players", async function (req, res) {
    let { username, score, best_time } = req.body;
    // check if the username already exists
    const alreadyExisting = await User.findOne({ username: username });

    if (alreadyExisting) {
        await User.deleteOne({ username });
        console.log(`Player ${username} deleted`);
        res.send({ status: true, msg: "player deleted" });
    } else {
        res.send({ status: false, msg: "username not found" });
    }
});

router.get("/players", async function (req, res) {
    // retrieve ‘lim’ from the query string info
    let { lim } = req.query;
    let rankArray = [];
    try {
        User.find()
            // -1 is for descending and 1 is for ascending
            .sort({ score: -1, best_time: 1 })
            .limit(lim)
            .then(result => {

                for (let i = 0; i < result.length; i++) {
                    rankArray[i] = result[i]['score'];
                }
                let rank = 1;
                prev_rank = rank;
                position = 0;
                // looping through the rank array
                for (i = 0; i < rankArray.length; i++) {
                    if (i == 0) {
                        position = rank;
                        result[i]['position'] = position;
                    } else if (rankArray[i] != rankArray[i - 1]) {
                        rank++;
                        position = rank;
                        prev_rank = rank;
                        result[i]['position'] = position;
                    } else {
                        position = prev_rank;
                        rank++;
                        result[i]['position'] = position;
                    }
                }
                return res.send({ status: true, msg: result });
                /*(function (err, result) {
            if (err)
                res.send({ status: false, msg: "failed to retrieve players" });
            console.log(Array.from(result));*/
                // res.send({ status: true, msg: result });
            });

    }
    catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get("/players/username", async function (req, res) {
    // retrieve ‘lim’ from the query string info
    let { lim } = req.query;
    try {
        await User.find()
            // -1 is for descending and 1 is for ascending
            .sort({ score: -1, best_time: 1 })
            // Show only [lim] players
            .limit(lim)
            .then(result => {
                console.log(result)/*(function (err, result) {
            if (err)
                res.send({ status: false, msg: "failed to retrieve players" });
            console.log(Array.from(result));*/
                res.send({ status: true, msg: result });
            });

    }
    catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

module.exports = router;
