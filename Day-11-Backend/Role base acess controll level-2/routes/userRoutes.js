const express=require("express")
const {userModel,TaskModel}= require("../modules/userModel")
const router=express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Auth = require("../middleware/Auth");
const Authorize = require("../middleware/Authorize");
const mongoose=require("mongoose")

// router.post("/ragister",async(req,res)=>{
//     const {name,email,password,Role,status}=req.body
//     const isPresent=await userModel.findOne({email})
//     if(isPresent) return res.json({message:"user already present"})
//     try {
//        bcrypt.hash(password,8,async function(err,hash){
//         if(err) return res.json({message:"error in ragistration",err})
//         const user=new userModel({name,email,password:hash,Role,status})
//         await user.save()
//         res.json({message:"user ragister successfull",user})
//        })
        
       
//     } catch (error){
//         res.json({message:"invalid credential"})
//     }
// })

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})

    // console.log(user.Role)
    if(!user) return res.json({message:"user is not logged in please ragister first"})
    try {
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err) return res.json({message:"error in comapre password",err})
            if(!result){
               return res.send("user not found")
            }
            const token=jwt.sign({id:user._id,name:user.email,userRole:user.Role},process.env.Secrete_Key)
            res.json({message:"login Sucessfull",token})
        })
    } catch (error) {
        res.json({message:"invalid credintial"})
    }
})

router.post("/create_task",Auth,Authorize(["member"]),async(req,res)=>{
    const {title,discription,status,createdAtdate,endDate}=req.body
    try {
        const book=new TaskModel({title,discription,status,createdAtdate,endDate})
        await book.save()
        res.json({message:"book created succesfull",book})
    } catch (error) {
        res.json({message:"book not created",error})
    }
})


// router.get("/Show_Created_Bookes",Auth,Authorize("CREATOR"),(req,res)=>{
//     res.send("showing creating books")
// })

// router.get("/getAllBook",Auth,Authorize(["VIEW_ALL"]),async(req,res)=>{
//     try {
//         const bookData=await BookModel.find({})
//         res.json({message:"getting all books",bookData})
//     } catch (error) {
//         res.json({message:"book not found"})
//     }
    
// })


// router.delete("/delete_Routes/:id",Auth,Authorize(["CREATOR"]),async(req,res)=>{
//     try {
//         const bookId=req.params.id
       
//         console.log("book",bookId)
        
//         const book = await BookModel.findById(bookId);
//         console.log("book id",book)
//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }
//         await BookModel.findByIdAndDelete(bookId)
//         res.json({ message: "Book successfully deleted" });
//     } catch (error) {
//         console.log("error",error)
//         res.json({message:"getting error in delete",error})
//     }
// })


// router.get("/AllBooks",Auth,Authorize("CREATOR"),async(req,res)=>{
//    try {
//         const {old,new:isNew}=req.query
//         const now = new Date();
//         const tenMinutesAgo = new Date(now.getTime() - 10 * 60000); 
//         const filter={}
//         if(old){
//             filter.createdAt = { $lte: tenMinutesAgo }; 
//         }else{
//             filter.createdAt = { $gt: tenMinutesAgo }; 
//         }
//         const data=await BookModel.find(filter)
//         res.json(data);
//    } catch (error) {
//     res.json("error",error);
//    }
// })

module.exports=router