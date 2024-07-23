
const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

router.post('/delete/:ind', async (req, res) => {
    const ind = req.params.ind;
    const index = parseInt(ind, 10);
    const username = req.body.username;
    const title= req.body.title;
    const entry=req.body.entry;
    console.log("deleting");

    try {
        const data = await Diary.findOneAndUpdate(
            { usrname: username },
            { $pull: { diaryentry: { title: title } } },
            { new: true }
        );

        if (!data) {
            return res.status(404).send("Diary not found");
        }

        res.status(201).send(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;