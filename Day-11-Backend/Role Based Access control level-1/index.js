require('dotenv').config()

const express=require("express")

const connectToDB = require('./config/db')
const  router  = require('./routes/userRoutes.js')

const app=express()

app.use(express.json())
app.use("/user",router)

const PORT=process.env.PORT||3014

app.listen(PORT,async(req,res)=>{
    await connectToDB()
    console.log("server started and connect to DB")
})