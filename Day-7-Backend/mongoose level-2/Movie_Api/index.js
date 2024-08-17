const mongoose=require("mongoose")
const express=require("express")
const app=express()
const bodyParser = require('body-parser');
const router = require("./Routes/userRoutes");
const port=3008
app.use(express.json())
app.use(bodyParser.json());


app.use("/Movie",router)
app.listen(port,async()=>{
    await connectToDB()
    console.log("server started")
})
async function connectToDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Cap10_2")
    console.log("connected to DB")
}