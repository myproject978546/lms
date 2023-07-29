require('dotenv').config();
const express = require('express')
const app = express()
const user = require('./models/user')
const controller = require('./controller/controller')
const dbconnect = require('./models/dbconnect')
const cookieParser = require('cookie-parser')
const { verifytoken , generatetoken } = require('./auth/index')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        console.log("this is inside destination");
        cb(null,"uploads/")
    },
    filename : function (req,file,cb){
        console.log("this is inside filename");
        cb(null, Date.now() + file.originalname)
    }
})
dbconnect()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'));
const upload = multer({ storage }).single('videofile')
app.set("view engine","ejs")

app.get("/",verifytoken,controller.home)
app.get("/register",controller.register)
app.get("/login",generatetoken,controller.login)
app.get("/videoupload",controller.videoupload)
app.get("/allstudents",controller.allstudents)
app.get("/admin",controller.admin)
app.post("/videoupload",upload,controller.videouploadpost)
app.post("/register",generatetoken,controller.registerpost)
app.get("/activate/:id",controller.activate)
app.get("/deactivate/:id",controller.deactivate)
app.post("/login",generatetoken,controller.loginpost)
app.get("/studentdashboard",verifytoken,controller.studentdashboard)
app.get("/createquiz",controller.createquiz)
app.post("/createquiz",controller.createquizpost)
app.get("/seequiz/:id",verifytoken,controller.seequiz)
app.post("/givetest/:id",verifytoken,controller.givetest)

app.listen(process.env.POR,()=>{
    console.log("the server is running");
})