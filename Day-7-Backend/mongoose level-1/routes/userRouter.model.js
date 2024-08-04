// const mongoose=require("mongoose")
const express=require("express")
const userRouter=express.Router()
const {userModel,courseModel}=require("../moduls/studentSchema")
const auth = require("../middleware/auth")

userRouter.post("/signup",async (req,res)=>{
    try {
        const {username,password,description}=req.body
        const data=await userModel.insertMany([{username,password,description}])
        
        console.log("sending data successfull")
        res.status(201).json({ message: "Signup Sucessfull",data:data });
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/post_data",async (req,res)=>{
    try {
        const {title,category,difficulty,description}=req.body
        const data=await courseModel.insertMany([{title,category,difficulty,description}])
        
        console.log("sending data successfull")
        res.status(201).json({ message: "Signup Sucessfull",data:data });
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/login",async (req,res)=>{
   try {
    const {email,password}=req.body
    const userExist=await userModel.findOne({email,password})
    if(!userExist){
        return res.status(405).json({message:"userNot exist"})
    }
    // const data =await res.session.userExist
    res.status(202).json({message:"login successful",data:userExist})
   } catch (error) {
    console.log(error)
   }
})


userRouter.post("/enroll",auth,(req,res)=>{
    const {courseId}=req.body
    courseModel.findById(courseId,(err,course)=>{
        if(err) return res.status(404).json(err)
        if(!course) return res.status(504).json({message:"course not found"})
        res.session.user.enrolledCourse.push(courseId)
        req.session.user.save((err)=>{
            if(err) return res.status(404).json(err)
    })
    })
})
userRouter.get("/courses",async (req,res)=>{
    try {
        const {category,filterByDifficulty,page=1,limit=10,order="asc"} = req.query;
       
       
        let filter = {};
        if (category) {
            filter.category ={ $regex: category, $options: 'i' };
        }
        let diffFilter={}
        if (filterByDifficulty) {
            diffFilter.filterByDifficulty ={ $regex: filterByDifficulty, $options: 'i' };
        }
        const sortBy={}
        
        const rawQueryResult = await movieModel.find(filter);
        console.log("Raw query result:", rawQueryResult);
        const data = await courseModel.find(filter).sort(sortBy).sort(diffFilter).skip(page * limit).limit(limit);;
        // await data.save()
        console.log("getting request",data)
        res.status(200).json({messaeg:"getting data",data:data})
    } catch (error) {
        console.log(error)
    }
})


module.exports=userRouter

