const express=require("express")
const fs=require("fs")
const app=express()
const PORT=3004
app.use(express.json()) //  for using middlewares


app.listen(PORT,(req,res)=>{
    console.log(`server started on port :http://localhost:${PORT}`)
    // res.send("server started successfully") we cant do that
})