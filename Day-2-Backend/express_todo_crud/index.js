const fs=require("fs")

const express=require("express")
const server=express()
server.use(express.json()); // its middleware
const PORT=8082
server.get("/",(req,res)=>{
    // const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    // console.log(data)
    res.send("hello world")
})

// function getDbData() {
//     try {
//       const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
//       return data;
//     } catch (error) {
//       console.error("Error reading db.json:", error);
//       return null; // Or return an empty object or a default value
//     }
//   }
server.get("/get-user",(req,res)=>{
    // console.log("getting any error")
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    // const data = getDbData();
    console.log(data)
    res.json(         // mai yaha send ka use nahi kr skta bcz send didnt support these
        {massege:"am getting data ",data:data}
    )

    
})
server.post("/post-user",(req,res)=>{
    const postData=req.body
    console.log("anserwer",postData)
    res.send()
})
server.listen(PORT,()=>{
    console.log(`server started on port : ${PORT}`)
})