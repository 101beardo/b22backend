const express=require("express")
const {PostModel} = require("../models/Post.model")

const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    let query=req.query
    try{
        const post=await PostModel.find(query)
        res.send(post)
    }catch(err){
        console.log(err)
        console.log("Something went wrong")
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_post = new PostModel(payload)
        await new_post.save()
        res.send("Created the note")
    }catch(err){
        console.log(err)
        console.log("Error in registering the user")
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post= await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_in_post!==userID_making_req){
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the post")
        }
    }catch(err){
        console.log(err)
        console.log("Error in registering the user")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post= await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_in_post!==userID_making_req){
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Updated the post")
        }
    }catch(err){
        console.log(err)
        console.log("Error in registering the user")
    }
})

module.exports={
    postRouter
}