const mongoose=require("mongoose")
const url="mongodb://127.0.0.1:27017/BackendEvaluation"
async function connectToDb(){
    try {
        await mongoose.connect(url)
        console.log("connect to DB")
    } catch (error) {
        console.log("getting error",error)
    }
}

module.exports=connectToDb