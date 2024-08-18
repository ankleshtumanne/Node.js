const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    Role:String,
    status:Boolean
})


const taskSchema=new mongoose.Schema({
    title:String,
    endDate:String,
    createdAtdate: { type: Date, default: Date.now },
    discription:String,
    status:String
})

const TaskModel=mongoose.model("book",taskSchema)


const userModel=mongoose.model("user",userschema)

module.exports={userModel,TaskModel}