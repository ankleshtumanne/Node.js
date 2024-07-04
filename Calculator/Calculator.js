const crypto=require("crypto")

function generateRandomNumber(length){
    if(!length){
        console.log("Provide length for random number generation")
        return
    }else{
        return crypto.randomBytes(length).toString()
    }
}

function Main(){
    
}