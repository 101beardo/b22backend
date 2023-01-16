const express=require("express")
const {UserModel}=require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require('dotenv').config()




const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,gender}=req.body
    try{
        bcrypt.hash(password, 5,async(err,secure_password)=>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({name,email,password:secure_password,gender})
                await user.save()
                res.send("Registered")
            }
        })
    }catch(err){
        console.log(err)
        console.log("Error in registering the user")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
       const user=await UserModel.find({email})
       const hased_pass=user[0].password
       if(user.length>0){
        bcrypt.compare(password, hased_pass, (err,result)=>{
            if(result){
                const token = jwt.sign({userID:user[0]._id},process.env.key)
                res.send({"msg":"Login Successful","token":token})
            }else{
                res.send("Wrong Credentials")
            }
        })
       }else{
        res.send("Wrong Credentials")
       }
    }catch(err){
        console.log(err)
        console.log("Error in logging the user")
    }
})



module.exports={
    userRouter
}