const mongoose=require("mongoose")
const express=require("express")
const {userModel,courseModel} = require("./moduls/studentSchema")
const connectToDb = require("./config")
const userRouter = require("./routes/userRouter.model")
const server=express()
const port=3007
// using middleware
server.use(express.json())

// use router middleware
server.use(userRouter)
server.listen(port, async (req,res)=>{
    // const connection=await mongoose.connect("")
    await connectToDb()
    console.log("server started")
})
