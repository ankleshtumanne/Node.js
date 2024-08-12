const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:String,
    password:String
})

const usermodel=mongoose.model("user",userSchema)

const blacklist=new mongoose.Schema({
    token:{type:String,required:true}
})

const blackListModel=mongoose.model("token",blacklist)

module.exports={usermodel,blackListModel}