const express = require('express')
const app = express()
const user = require('./models/user')
const courses = require('./models/courses')
const dbconnect = require('./models/dbconnect')
const cookieParser = require('cookie-parser')
const { verifytoken , generatetoken } = require('./auth/index')
const multer = require('multer')
const video = require('./models/video')

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

// routes

app.get("/",(req,res)=>{
    const data = [
        {
            linkname:"Register",
            linkurl:"/register"
        },
        {
            linkname:"My Dashboard",
            linkurl:"/studentdashboard"
        },
        {
            linkname:"contact us",
            linkurl:"/contactus"
        }
    ]
    res.render('home',{links:data})
})

app.get("/register",(req,res)=>{
    res.render('register')
})

app.get("/login",(req,res)=>{
    res.render('login')
})

app.get("/videoupload",(req,res)=>{
    res.render('videoupload')
})

app.post("/videoupload",upload,async(req,res)=>{
    const data = {
        title:req.body.title,
        description:req.body.description,
        videoname:req.file.filename
    }
    await video.insertMany([data])
    res.send("video uploaded")
})


app.get("/admin",(req,res)=>{
    res.render('admin')
})

app.post("/register",generatetoken,async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.body.email})    
    if(checkifuserexist){
        res.send("this email is already in use another account")
    }else{
        await user.insertMany([req.body])
        res.render('studentdashboard',{status:false})
        // res.send("your account is created successfully")
    }
})

app.get("/activate/:id", async (req,res)=>{
    const findstudent = await user.findByIdAndUpdate(req.params.id,{status:true})
    res.send("activated")
})

app.get("/deactivate/:id", async (req,res)=>{
    const findstudent = await user.findByIdAndUpdate(req.params.id,{status:false})
    res.send("deactivated")
})

app.post("/login",generatetoken,async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.body.email,password:req.body.password})
    if(!checkifuserexist){
        res.send("entered user email id or password wrong")
    }else{
        const videos = await video.find()
        res.render('studentdashboard',{status:checkifuserexist.status,videos})
    }
})

app.get("/studentdashboard",verifytoken,async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.mydata.email,password:req.mydata.password})
    const videos = await video.find()
    res.render('studentdashboard',{status:checkifuserexist.status,videos})
})

app.get("/allstudents",async (req,res)=>{
    const students = await user.find()
    res.render('allstudents',{students,total:students.length})
})

app.listen(3200,()=>{
    console.log("the server is running");
})