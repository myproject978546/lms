const mongoose = require('mongoose')

const scoreschema = new mongoose.Schema({
    studentid:{
        type:String,
        required:true
    },
    quizid:{
        type:String,
        required:true
    },
    quizanswers:{
        type:Object,
        required:true
    },
    score:{
        type:[Number],
        required:true
    }
})

module.exports = new mongoose.model("Score",scoreschema)