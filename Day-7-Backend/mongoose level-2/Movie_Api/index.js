const mongoose=require("mongoose")
const express=require("express")
const app=express()
const bodyParser = require('body-parser');
const port=3008
app.use(express.json())
app.use(bodyParser.json());

const movieSchema=({
    title:String,
    realise_date:Number,
    director:String,
    rating:Number
})
const movieModel= mongoose.model("movie",movieSchema)
app.get("/user_data",async (req,res)=>{
    try {
        const {title,sortByrating,page,order="asc"} = req.query;
        // const pagenumber=0
        // const limit=5
        const pagenumber = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        let filter = {};
        if (title) {
            filter.title = title;
        }
        const sortBy={}
        if(sortBy){
            sortBy[sortByrating]=order==="asc"? 1:-1
        }
        
        const data = await movieModel.find(filter).sort(sortBy).skip(page * limit).limit(limit);;
        console.log("getting request",data)
        res.status(200).json({messaeg:"getting data",data:data})
    } catch (error) {
        console.log(error)
    }
})
app.post("/post_user",async (req,res)=>{
    try {
        const {title,realise_date,director,rating}=req.body
        if (!title || !realise_date || !director || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const data=await movieModel.insertMany([{title,realise_date,director,rating}])
        res.status(201).json({message:"getting data",data:data})
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"error occured",error})
    }
})
app.listen(port,async()=>{
    await connectToDB()
    console.log("server started")
})
async function connectToDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Cap10_2")
    console.log("connected to DB")
}