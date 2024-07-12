const express=require("express")
const fs=require("fs")
const server=express()
const PORT=8080
server.use(express.json());

server.get("/home", (req, res) => {
    res.send("Hello, world!");
});
server.post("/get_data",(req,res)=>{
    const data=req.body
    console.log(data)
    
    const parse_data=fs.readFileSync("./db.json","utf-8")
    const finalData=JSON.parse(parse_data)
    finalData.users.push(data)
    fs.writeFileSync("./db.json",JSON.stringify(finalData))
    res.send(finalData)
})
server.listen(PORT,()=>{
    console.log(`server is running on : ${PORT}`)
})