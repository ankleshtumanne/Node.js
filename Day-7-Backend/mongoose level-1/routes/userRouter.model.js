// const mongoose=require("mongoose")
const express=require("express")
const userRouter=express.Router()
const userModel=require("../moduls/studentSchema")

userRouter.post("/signup",async (req,res)=>{
    try {
        const data=await userModel.insertMany([req.body])
        // const {name,email,password}=req.body
        // await {name,email,password}.save()
        console.log("sending data successfull")
        res.status(201).json({ message: "Signup Sucessfull" });
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/login",async (req,res)=>{
   try {
    const {name,email,password}=req.body
    const userExist=await userModel.findOne({email})
    if(userExist){
        res.status(200).json({message:"user is already prasent"})
    }
    const data= await userModel.create([req.body])
    
    res.status(202).json({message:"login successful"})
   } catch (error) {
    console.log(error)
   }
})

userRouter.get("/get_user",async (req,res)=>{
    try {
        const users = await userModel.find({});
        console.log("Getting all user list",users);
        res.json({ message: "Getting data", data: users });
    } catch (error) {
        console.log(error)
    }
})
userRouter.patch("/update_user/:id",async (req,res)=>{
    const user=await userModel.findByIdAndUpdate(req.params.id,req.body)//we need body here
    res.status(203).json({message:"data updated sucsessfully",data:user})
})
userRouter.delete("/delete_user/:id",async (req,res)=>{
    const user=await userModel.findByIdAndDelete(req.params.id) //  we dont need body here
    res.status(203).json({message:"data Deleted sucsessfully",data:user})
})
module.exports=userRouter

