const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

router.post('/diary/:user', (req, res) => {
    let username = req.params.user;
    let title = req.body.title;
    let entry = req.body.entry;
    Diary.findOne({ usrname: username }, async (err, data) => {

        let entry1 = {
            title,
            entry,
            date: new Date()
        }
        data.diaryentry.push(entry1);
        data.save((err) => {
            if (err) {
                console.log("Error : " + err);
                res.send(500);
            }
            else {
                res.status(201).send(data);
            }
        })

    })
    
})

module.exports = router;