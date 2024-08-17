const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    Role:String
})


const bookSchema=new mongoose.Schema({
    title:String,
    CreateBy:String,
    createdAtdate: { type: Date, default: Date.now },
})

const BookModel=mongoose.model("book",bookSchema)


const userModel=mongoose.model("user",userschema)

module.exports={userModel,BookModel}