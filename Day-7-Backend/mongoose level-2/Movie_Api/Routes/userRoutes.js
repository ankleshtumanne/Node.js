const mongoose=require("mongoose")
const express=require("express");
const movieModel = require("../modules/userModule");
const router = express.Router();
router.get("/user_data",async (req,res)=>{
    try {
        const {title, sortBy, page=1,limit=5,order} = req.query;
       
        console.log(title)
        let filter = {};
        if (title) {
            filter.title =title//{ $regex: title, $options: 'i' };
        }
        const sortObj={}
        if(sortBy){
            sortObj[sortBy]=order==="asc"? 1:-1
        }
        // const rawQueryResult = await movieModel.find(filter);
        // console.log("Raw query result:", rawQueryResult);
        const data = await movieModel.find(filter).sort(sortObj).skip((page-1)* limit).limit(limit).exec();
        // await data.save()
        console.log("getting request",data)
        res.status(200).json({messaeg:"getting data",data:data})
    } catch (error) {
        console.log(error)
    }
})
router.post("/post_user",async (req,res)=>{
    try {
        const {title,realise_date,director,rating}=req.body
        if (!title || !realise_date || !director || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const data=await movieModel.insertMany([{title,realise_date,director,rating}])
        res.status(201).json({message:"getting data",data})
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"error occured",error})
    }
})

module.exports=router