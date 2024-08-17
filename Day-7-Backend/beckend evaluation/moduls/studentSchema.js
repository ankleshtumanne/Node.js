const mongoose=require("mongoose")

const CourseSchema=new mongoose.Schema({
    title:String,
    category:String,
    difficulty:String,
    description:String
})

const courseModel=mongoose.model("course",CourseSchema)

const userSchema=mongoose.Schema({
    username:String,
    
    password:String,
    enrolledCourse:[String]
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel,courseModel}