var jwt = require('jsonwebtoken');

async function Auth(req,res,next) {
    const token=req.query.token
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token,"Anku",(err,decode)=>{
        if(err){
           return res.json({message:"user is not Authorized",err})
        }
        if(decode){
            console.log("decode value",decode)
            next()
        }
    })
}

module.exports=Auth