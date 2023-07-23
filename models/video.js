const mongoose = require('mongoose')

const videoschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoname:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model("Video",videoschema)