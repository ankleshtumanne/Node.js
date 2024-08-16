const mongoose=require("mongoose")
require('dotenv').config()
async function connectToDB(){
    try {
        await mongoose.connect(process.env.mongo_url)
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectToDB