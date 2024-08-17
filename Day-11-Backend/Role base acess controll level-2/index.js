require("dotenv").config()

const express=require("express")
const connectToDB = require("./config/db")
const router = require("./routes/userRoutes")
const app=express()
const port=process.env.PORT||3015

app.use(express.json())

app.use("/user",router)

app.listen(port,async(req,res)=>{
    await connectToDB()
    console.log("server started")
})