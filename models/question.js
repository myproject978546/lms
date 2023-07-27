const mongoose = require('mongoose')

const questionschema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    correctanswer:{
        type:Number,
        required:true
    }
})

module.exports = new mongoose.model("Question",questionschema)