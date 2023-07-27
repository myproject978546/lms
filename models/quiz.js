const mongoose = require('mongoose')

const quizschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    questions:{
        type:[String]
    }
})

module.exports = new mongoose.model("Quiz",quizschema)