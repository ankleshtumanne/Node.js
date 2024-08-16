const Authorize=(permittedRole)=>{
    return (req,res,next)=>{
        const user_role=req.Role

        if(permittedRole.includes(user_role)){
            next()
        } else {
            res.send("unauthorized")
        }
    }
}

module.exports=Authorize