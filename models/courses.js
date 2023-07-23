const mongoose = require('mongoose')

const courseschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model("Course",courseschema)