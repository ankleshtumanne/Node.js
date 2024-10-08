const fs=require("fs")

const express=require("express")
const server=express()
server.use(express.json()); // its middleware
const PORT=8082
function getData(){ // for using reading the data 
    try {
        const data=JSON.parse(fs.readFileSync("./db.json","utf-8")) // json.parse converts json data to js object
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
function writeDbData(data) {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data, null), "utf-8"); // ehrn we send data from json formate when we use json.stringfy
    } catch (error) {
        console.error("Error writing to db.json:", error);
    }
}
server.get("/",(req,res)=>{
    // const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    // console.log(data)
    res.send("hello world")
})
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



server.post("/update_user",(req,res)=>{
    const data=getData()
    let flag=false
    const ans=data.todos.map((ele,i)=>{
        console.log(ele.status, ele.id)
        if(ele.id%2===0 && ele.status===false){
            ele.status=true
            flag=true
        }
        return ele
    })
    ////////////////yaha se problem start
    if(flag){
        writeDbData({ data: ans });
        res.json({massege:"getting data successful"})
    }
    else{
        // return res.status(404).json({ message: "No todos needed updating" });
        res.send("404 not found")
    }
    
})
// registered user can delete
// to check user registered or not
const checkUser = (req,res,next)=>{
    let data = fs.readFileSync("./db.json","utf-8")
    //req.body.user.name
    data.user.forEach((el,i)=>{
        if(el.name == req.body.user.name){
            next()
            return
        }
    })
    res.status(401).json({message:"Unauthorised to perform this action"})
}
// server.delete("/delete-user/:id",checkUser,(req,res)=>{
//     //after deleting user,you want to call login function
//     const deleteId=parseInt(req.params.id)
//     console.log(deleteId)
//     const data=getData()
//     console.log(data)
//     const flag=false
//     const ans=data.todos.foreach((ele,i)=>{
//         if(ele.id===deleteId){
//             data.todos.splice(todoIndex, 1);
//             flag = true
//         }
//         // writeDbData(data);
//     })
//     if (flag) {
//         writeDbData(data);
//         res.json({ message: "Query deleted successfully" });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//     // res.json({massege:"query deleted successfull"})

// })
server.listen(PORT,()=>{
    console.log(`server started on port : http://localhost:${PORT}`)
})

// const http=require("http")
// const fs=require("fs")
// const express=require("express")
// const server=express()
// server.use(express.json())//middleware
// const PORT=8080
// const readJson=()=>{
// const data=fs.readFileSync("./db.json","utf-8")
// return JSON.parse(data)
// }
// const writeJson=(data)=>{
//     fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
// }
// server.get("/todos",(req,res)=>{
//    const data=readJson()
//    res.send(data)
// })
// server.post("/todos",(req,res)=>{
//    const data=readJson()
//    const newTask={
//     id:data.todos.length+1,
//     task:req.body.task,
//     status:false
//    }
//    data.todos.push(newTask)
//    writeJson(data)
//    res.json(newTask)
// })
// server.put("/todos/update",(req,res)=>{
//     const data=readJson()
//     data.todos.forEach((todo)=>{
//         if(todo.id % 2 == 0 && todo.status == false){
//             todo.status=true
//         }
//     })
//     writeJson(data)
//     res.json(data.todos)
// })
// server.delete("/todos/delete-true",(req,res)=>{
//     const data=readJson()
//        data.todos=data.todos.filter((todo)=>!todo.status)
//        writeJson(data)
//        res.json(data.todos)
//     })
// server.listen(PORT,()=>{
//     console.log(`listening on port 3002 ${PORT}`);
// })