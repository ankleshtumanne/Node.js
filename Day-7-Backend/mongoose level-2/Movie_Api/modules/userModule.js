const mongoose=require("mongoose")
const movieSchema=({
    title:String,
    realise_date:Number,
    director:String,
    rating:Number
})
const movieModel= mongoose.model("movie",movieSchema)
module.exports=movieModel