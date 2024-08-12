require('dotenv').config()
const bcrypt = require('bcrypt');
const express=require("express")
const connectToDB = require('./config/db')
const router = require('./routes/userRoutes')
var jwt = require('jsonwebtoken');
const app=express()

const port=process.env.PORT ||3012



app.use(express.json())
app.use("/user",router)


app.listen(port,async(req,res)=>{
    await connectToDB()
    console.log("server start and connected to db")
})