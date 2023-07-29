require('dotenv').config();
const mongoose = require('mongoose')

async function dbconnect(){
    mongoose.connect(process.env.MONGO,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("mongodb connect")}).catch(()=>{console.log("not connect mongodb")})
}
    
module.exports=dbconnect;