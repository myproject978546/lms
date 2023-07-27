const user = require('../models/user')
const video = require('../models/video')
const question = require('../models/question')
const quiz = require('../models/quiz')
const score = require('../models/score')

const register = (req,res)=>{
    res.render('register')
}

const login = (req,res)=>{
    res.render('login')
}

const videoupload = (req,res)=>{
    res.render('videoupload')
}

const allstudents = async (req,res)=>{
    const students = await user.find()
    res.render('allstudents',{students,total:students.length})
}

const admin = (req,res)=>{
    res.render('admin')
}

const videouploadpost = async(req,res)=>{
    const data = {
        title:req.body.title,
        description:req.body.description,
        videoname:req.file.filename
    }
    await video.insertMany([data])
    res.send("video uploaded")
}

const registerpost = async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.body.email})    
    if(checkifuserexist){
        res.send("this email is already in use another account")
    }else{
        await user.insertMany([req.body])
        res.render('studentdashboard',{status:false})
    }
}

const activate =  async (req,res)=>{
    const findstudent = await user.findByIdAndUpdate(req.params.id,{status:true})
    res.send("activated")
}

const deactivate =  async (req,res)=>{
    const findstudent = await user.findByIdAndUpdate(req.params.id,{status:false})
    res.send("deactivated")
}

const loginpost = async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.body.email,password:req.body.password})
    if(!checkifuserexist){
        res.send("entered user email id or password wrong")
    }else{
        const videos = await video.find()
        const quizs = await quiz.find()
        res.render('studentdashboard',{status:checkifuserexist.status,videos,quizs})
    }
}

const studentdashboard = async (req,res)=>{
    const checkifuserexist = await user.findOne({email:req.mydata.email,password:req.mydata.password})
    const videos = await video.find()
    const quizs = await quiz.find()
    // console.log(quizs);    
    res.render('studentdashboard',{status:checkifuserexist.status,videos,quizs})
}

const home = (req,res)=>{
    const data = [
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
}

const createquiz = (req,res)=>{
    res.render('createquiz')
}

const createquizpost = async (req,res)=>{
    const data = req.body;
    let arr = []
    let qname;
    for (keys in data){
        if(keys != "quizname"){
            arr.push(data[keys])
        }else{
            qname = data[keys]
        }
    }

    question.insertMany(arr).then( async (take)=>{
        let store = []
        for (keys in take) {
            let a = take[keys]["_id"].toString();
            store.push(a)
        }
        const quizdata = {
            name:qname,
            questions:store
        }
        await quiz.insertMany([quizdata])
        res.send("quiz created successfully")
    })
}

const seequiz = async (req,res)=>{
    try{
        const studentname = await user.findOne({email:req.mydata.email})
        const stid = studentname._id.toString()
        const qid = req.params.id
        const checkscore = await score.findOne({studentid:stid,quizid:qid})
        if(checkscore == null){
            const check = await quiz.findById(req.params.id)
            let arr = []
            check.questions.forEach( async function findall(id,ind){
                let a = await question.findById(id)
                arr.push(a)
                if(check.questions.length === ind+1){
                    res.render('seequiz',{questions:arr,quizid:req.params.id})
                }
            })
        }else{
            res.send("you have already this quiz")
        }
    }catch{
        console.log("there is an error while seequiz");
    }
}

const givetest = async (req,res)=>{
    let a = await user.findOne({email:req.mydata.email})

    const qid = await quiz.findById(req.params.id)

    let takeans = []
    for (keys in req.body) {
        let a = req.body[keys]
        takeans.push(Number(a))
    }

    let corr = []
    for (iterators of qid.questions) {   
        let a = await question.findById(iterators)
        corr.push(a.correctanswer)
    }
    
    let count=0;
    corr.forEach((element,index)=>{
        if(element != takeans[index]){
            count++;
        }
    })

    const data = {
        studentid:a["_id"].toString(),
        quizid:req.params.id,
        quizanswers:req.body,
        score:[corr.length-count,corr.length]
    }

    await score.insertMany([data])

    res.send("quiz saved successfully")
}

module.exports = {givetest,seequiz,createquizpost,createquiz,home,studentdashboard,loginpost,deactivate,activate,registerpost,admin,allstudents,videoupload,register,login,videouploadpost}