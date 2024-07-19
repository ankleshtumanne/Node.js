const express=require("express")
const fs=require("fs")
const app=express();
const PORT=8989

app.post("/update_user",(req,res)=>{
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const parseData=req.body
    const random_data={"id":2,"email":"anklesh","password":"12345"}
    if
    console.log("getting data",data)
})
app.listen(PORT,(req,res)=>{
    console.log(`server is started on port : http://localhost:${PORT}`)
})


