const { userModel } = require("../moduls/studentSchema")

async function  auth(req,res,next) {
    const user=req.body
    if(req.session.user){
        next()
    }else{
        res.send("not getting")
    }
    
}
module.exports=auth