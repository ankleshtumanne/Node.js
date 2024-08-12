const mongoose=require("mongoose")
require('dotenv').config()
async function connectToDB(){
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log("connect to db")
    } catch (error) {
        console.log("error in connect to db",error)
    }
}

module.exports=connectToDB