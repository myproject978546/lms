const jwt = require('jsonwebtoken')
const express = require('express')
const user = require('../models/user')

async function generatetoken(req,res,next){
    try{
        const token = jwt.sign(req.body,"secret",{expiresIn:"2d"})
        res.cookie("token",token,{maxAge:86000000})
        next()
    }catch{
        res.send("internal server error while generating jwt token")
    }
}

async function verifytoken(req,res,next){
    try{
        const gettoken = req.cookies.token
        const getpayload = jwt.verify(gettoken,"secret")
        const check = await user.findOne({email:getpayload.email})
        if(!check){
            res.send("you have to login or register")
        }else{
            req.mydata = check;
        }
        next();
    }catch{
        const links = [
            {
                linkname:"Register",
                linkurl:"/register"
            },
            {
                linkname:"Login",
                linkurl:"/login"
            }
        ]
        res.render("home",{links})
    }
}

module.exports = { verifytoken,generatetoken};