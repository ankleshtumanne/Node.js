const mongoose=require("mongoose")

async function connectToDB(){
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log("connect to atlass")
    } catch (error) {
        console.log("error",error)
    }
}

module.exports=connectToDB