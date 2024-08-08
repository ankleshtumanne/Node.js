var jwt = require('jsonwebtoken');

async function Authantication(req,res,next){
    const token=req.headers.autharization?.split(" ")[1]
    if(!token){
        return res.send("token not found")
    }
    jwt.verify(token,"Anku",(err,decode)=>{
        if(err) return res.json({message:"user not Aoutharized",err})
        if(decode) return next()
    })
}

module.exports=Authantication