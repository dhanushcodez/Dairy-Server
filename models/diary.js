const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usrname: {
        type: String,
        required: true
    },
    diaryname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    diarysize: {
        type: Number,
        default: 0
    },
    diaryentry: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Diary', diarySchema);
