const express=require("express")
const { usermodel, blackListModel } = require("../modules/userModel")
const router=express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Auth = require("../middleware/Auth");

// router.post("/ragistration",async(req,res)=>{
//     const {username,password}=req.body
    
//     try {
//         const ispresent=await usermodel.findOne({username})
//         if(ispresent) return res.json({message:"user already present"})

//         bcrypt.hash(password,5,async function(err, hash) {
//             if(err) return res.json({message:"error",err})
            
            
            
//             const user= new usermodel({username,password:hash})
//             await user.save()
//             res.json({message:"ragistration successfull",user:user})
//         })
//     } catch (error) {
//             res.json({message:"error in ragistration",error})
//         }
//     });
    
// router.post("/login",async(req,res)=>{
//     const {username,password}=req.body
//     try {
       
//         const user=await usermodel.findOne({username})
//         console.log(user)
//         if(!user) return res.json({message:"invalid creadintial"})

//         bcrypt.compare(password, user.password,async function(err, result) {
//             if(err) return res.json({message:"error",err})
           
           
//             const token=jwt.sign({_id:user._id},process.env.secrete_key,{ expiresIn: '1h' })
//             const refressToken=jwt.sign({_id:user._id},process.env.secrete_key,{expiresIn:"7d"})
//             if(result){
//                 res.json({message:"login successfull",token,refressToken})
//             }
//         })

//     } catch (error) {
//         res.json({message:"user not found",error})
//     }
// })

// router.post("/logOut",Auth,async(req,res)=>{
//     let {token}=req.user
//     console.log("token",token)
   
//     if (!token) {
//         return res.status(400).json({ message: "Token is missing" });
//     }
   
//     try {
//         const Blacklist=new blackListModel({token})
//         await Blacklist.save()
//         res.json({message:"Log Out Successfull "})
//     } catch (error) {
//         res.json({message:"error in posting in blacklist",error})
//     }
// })
router.post("/refress_logOut",Auth,async(req,res)=>{
    const refressToken=req.user.refressToken
    console.log("refress token",refressToken)

    
    try {
        const isBlacklisted = await blackListModel.findOne({refressToken});
    // console.log("isBlacklisted => ",isBlacklisted)
        if (isBlacklisted) {
            return res.status(403).json({ message: "refress token is invalid and blocklisted , please login again" });
        }

        await blackListModel.create({ token: refressToken });
        const refress=jwt.sign({_id:req.user._id},process.env.secrete_key,{expiresIn:"7d"})
        res.json({message:"refress sucessfull",refress})
    } catch (error) {
        res.json({message:"error in refressing",error})
    }

})


// router.get("/allroutes",Auth,(req,res)=>{
//     res.json({message:"getting allroutes data"})
// })


module.exports=router