const mongoose = require('mongoose')

async function dbconnect(){
    mongoose.connect("mongodb://127.0.0.1:27017/LMS",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("mongodb connect")}).catch(()=>{console.log("not connect mongodb")})
}
    
module.exports=dbconnect;