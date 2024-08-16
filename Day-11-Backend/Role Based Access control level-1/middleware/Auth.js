require('dotenv').config()
var jwt = require('jsonwebtoken');
const {userModel }= require('../modules/userModel');

async function Auth(req,res,next){
    const token=req.headers.authorization?.split(" ")[1]
    if(!req.headers.authorization) return res.send("headers not found")
    // console.log("token",token)
    if(token){
        try {
            jwt.verify(token,process.env.secret_key,async (err,decoded)=>{
                if(err) return res.send("error occured in decoding")
                if(decoded){
                    const userId=decoded.id
                    
                    const user=await userModel.findById(userId)
                    if(!user) return res.send("user not found")
                    const Role=user?.Role
                    req.Role=Role
                    req.user=user
                    next()
                }
                else{
                    res.json({message:"decod not found"})
                }
            })
        } catch (error) {
            res.json({message:"invalid token"})
        }
    }else{
        res.send("invalid token")
    }
}
module.exports=Auth
