require('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")

const connectToDB = require('./config.js')
const routes = require('./routes/userRoutes.js')

const app=express()
require("./config.js")
const port=process.env.PORT||3005

app.use(express.json()) //middleware
app.use(routes)


app.listen(port,async(req,res)=>{
    try {
        await connectToDB()
        console.log("connect to db and server started")
    } catch (error) {
        console.log(error)
    }
})
