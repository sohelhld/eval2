const express = require('express');
const {userModel} = require('../models/user.model');
const userRouter = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const { blackListModel } = require('../middleware/blacklisting');
const { auth } = require('../middleware/auth.middleware ');

userRouter.get("/",(req,res)=>{
    res.send("gfsg")
})
userRouter.post("/register",(req,res)=>{

    const {email,pass,role}= req.body

    try {

        bcrypt.hash(pass, 5, async(err, hash)=> {    
            const user = new userModel({email,pass:hash,role})
            await user.save()
            res.status(200).send({msg:"new user is register"})
        })
        
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass,role}=req.body

    try {
        const isUserPresent= await userModel.findOne({email})
        if(!isUserPresent){
            return  res.status(400).send({msg:"user is not register, plz singup"})
        }

        const token = jwt.sign({ userID: isUserPresent._id}, 'secretKey', { expiresIn: 60 * 60 });
        const refreshToken = jwt.sign({ userID: isUserPresent._id}, 'refreshSecretKey', { expiresIn: 60 * 3 * 60 });
         
        res.cookie("cookieAccessToken",token,{maxAge:1000*60})
        res.cookie("cookieRefreshToken",refreshToken,{maxAge:3000*60})
        res.cookie("userRole",role)

        bcrypt.compare(pass,isUserPresent.pass,async(err,result)=>{
            if(result){
                try {
                    res.status(200).send({msg:"Login Succesful",token,refreshToken})
                } catch (error) {
                    res.status(400).send({msg:"Wrong Password"})
                }
            }else{
                res.status(400).send({msg:"Wrong Password"})
                // console.log(err);
            }

        })
      
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

userRouter.get("/logout",auth,async(req,res)=>{

    try {
        const {cookieAccessToken,cookieRefreshToken}=req.cookies
        // console.log(cookieAccessToken);
        // console.log(cookieRefreshToken);

        blackListModel.push(cookieAccessToken)
        
        res.status(200).send({msg:"logout Succesfull!"})
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }    
})


module.exports={
    userRouter
}