const express = require('express')
const app = express()
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        console.log("destination");
        cb(null,"uploads/")
    },
    filename : function (req,file,cb){
        console.log("filename");
        cb(null, Date.now() + file.originalname)
    }
})
app.use(express.static('uploads'));
const upload = multer({ storage }).single('videofile')
app.set("view engine","ejs")

app.get("/videoupload",(req,res)=>{
    res.render('videoupload')
})

app.post("/videoupload",upload,(req,res)=>{
    res.send("video uploaded")
})

app.listen(3200,()=>{
    console.log("the server is restarted");
})

////////////////////////////////////////
// const express = require('express')
// const app = express()
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         console.log("destination");
//         cb(null,"uploads/")
//     },
//     filename : function (req,file,cb){
//         console.log("filename");
//         cb(null, Date.now() + file.originalname)
//     }
// })

// app.use(express.static('uploads'));

// const upload = multer({ storage }).single('avatar')

// app.set("view engine","ejs")

// app.get("/",(req,res)=>{
//     res.render('index')
// })

// app.post("/upload",upload,(req,res)=>{
//     res.send("photo send successfully")
// })

// app.listen(3000,()=>{
//     console.log("the server is started");
// })