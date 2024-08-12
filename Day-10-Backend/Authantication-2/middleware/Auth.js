var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function Auth(req,res,next) {
    if(!req.headers.authorization){
        return res.json({message:"req.hearders.autharization not found"})
    }
    const token=req.headers.authorization?.split(" ")[1]
    const refressToken=req.headers.authorization?.split(" ")[1]

    if(!token) return res.json({message:"token not found"})
    if(!refressToken) return res.json({message:"refress token not found"})

    // console.log("token",token)
    try {
        
        jwt.verify(token, process.env.secrete_key, function(err, decoded) {
            if(err) return res.json({message:"error in verifing token",err})
            if(decoded){
                // console.log("decoded",decoded)
                // req.user=decoded
                req.user = { ...decoded, token, refressToken}; 
                // console.log("req.user",req.user)
                next()
            }
        });
    } catch (error) {
     res.json({message:"token not found"})
    }
   
}

module.exports=Auth