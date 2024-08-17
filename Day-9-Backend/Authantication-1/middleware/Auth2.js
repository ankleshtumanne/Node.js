var jwt = require('jsonwebtoken');

async function Authantication(req,res,next){
   
    const token=req.headers.authorization.split(" ")[1]
    console.log("token",token)
    if(token){
        try {
            const decode=jwt.verify(token,"Anku")
            if(decode){
                next()
            }else{
                return res.json({message:"user not Aoutharized"})
            }
        } catch (error) {
            return res.json({message:"user not Aoutharized"})
        }
    
    }
    else{
        res.json({message:"please login first"})
    }
    
   
}

module.exports=Authantication