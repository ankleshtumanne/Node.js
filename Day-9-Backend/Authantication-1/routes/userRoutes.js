const express=require("express")
const routes=express.Router()
var jwt = require('jsonwebtoken');

const {userModel,bookModel}=require("../models/userModel.js");
// const Auth = require("../middleware/Auth.js");
const Authantication = require("../middleware/Auth2.js");
routes.get("/",async(req,res)=>{
    const data=await userModel.find({})
    res.json({message:"usr getting sucessfull",data:data})
})
routes.post("/ragistration",async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const user=await userModel.findOne({email})
        if(user){
            return res.send("user already present")
        }
        const data= new userModel({name,email,password})
        await data.save()
        console.log("ragistration successfull")
        res.send("send data succesessful")
    } catch (error) {
        res.send("error occures",error)
    }
})
routes.post("/login",async(req,res)=>{
   try {
    const {email,password}=req.body
    const user=await userModel.findOne({email,password})
    if(!user){
        return res.json({message:"please ragisterd first"})
       
    }
    const token= jwt.sign({ user: req.body.name }, 'Anku');  // anku is a my secret key
    res.json({message:"login sucessfull",token})
   } catch(error) {
    res.json({message:"error occured",error})
   }
})

routes.get("/products",Authantication,async(req,res)=>{
    res.send("getting products")
})
routes.get("/posts",Authantication,async(req,res)=>{
    res.send("getting posts data")
})
module.exports=routes 