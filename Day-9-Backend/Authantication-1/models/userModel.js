const mongoose=require("mongoose")


const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    price:Number,
    discription:String

})
const bookModel=mongoose.model("book",bookSchema)
const userSchema=new mongoose.Schema({
    Name:String,
    email:String,
    password:String
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel,bookModel}