const express = require("express");
const userModel = require("../models/usermodel");

const userRoutes = express.Router()


userRoutes.post("/signup", async (req, res) => {
    // req.body
    try {
      let user = await userModel.insertMany([req.body]) // yaha mai mera data distructure kar sakta hu 
      await user.save();
      res.status(201).json({ message: "Signup Sucessfull" });
    } catch (err) {
      console.log("error in creating user", err);
      res.status(400).json({ message: "sonrthing went wrong please try again later" });
    }
  });


module.exports = userRoutes