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
// async function Auth(req,res,next) {
//     const token=req.headers.authorization?.split(" ")[1]
//     if(!token){
//         return res.json({message:"no token found"})
//     }
//     jwt.verify(token,"Anku",(err,decode)=>{
//         if(err) return res.json({message:"user not autharized",err})
//         if(decode){
//             next()
//         }
//     })
// }

module.exports=Auth