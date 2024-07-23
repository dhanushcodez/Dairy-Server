const express = require('express');
const router = express.Router();
const Diary = require('../models/diary');

router.patch('/update/:ind', async (req, res) => {
    try {
        const ind = parseInt(req.params.ind); // Convert string to integer
        const prevTitle=req.body.tit;
        const title = req.body.title;
        const entry = req.body.entry;
        const username = req.body.username;
        //console.log(prevTitle);
        //console.log(title);

        const data = await Diary.findOneAndUpdate(
            { usrname: username },
            {
                $set: {
                    'diaryentry.$[elem].title': title,
                    'diaryentry.$[elem].entry': entry
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.title': prevTitle }]
            }
        );

        if (!data) {
            return res.status(404).json({ message: 'User not found or diary entry not found' });
        }

        res.status(200).send(data);
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({ message: 'An internal server error occurred' });
    }
});

module.exports = router;
















