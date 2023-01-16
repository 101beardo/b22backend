const express=require("express")
const {connection} = require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const { authenticate } = require("./middleware/authenticate.middleware")

require('dotenv').config()
const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Running at ${process.env.port}`)
})