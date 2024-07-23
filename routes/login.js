const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

router.post('/login', async (req, res) => {
    try {
        Diary.find({ 'usrname': req.body.usrname }, async (err, data) => {
            if (data.length == 0) {
                res.sendStatus(404);
            }
            else {
                res.status(200).send(data[0]);
            }
        })
    }
    catch (err) {
        res.sendStatus(500);
    }

})

router.post('/signup', async (req, res) => {
    try {
        Diary.find({ 'usrname': req.body.usrname }, async (err, data) => {
            if (data.length != 0) {
                res.sendStatus(409);
            }
            else {
                /*await Diary.create({
                    name : req.body.name,
                    usrname : req.body.usrname,
                    diaryname : req.body.diaryname,
                    password : req.body.password
                });*/
                const newDiary = new Diary({
                    name: req.body.name,
                    usrname: req.body.usrname,
                    diaryname: req.body.diaryname,
                    password: req.body.password
                });
                newDiary.save().then(diary => res.sendStatus(201))
            }
        })
    }
    catch (err) {
        res.status(500).send({ "Error": "Server Error" });
    }
})

module.exports = router;