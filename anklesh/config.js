const mongoose = require("mongoose");

async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to db");
    } catch (err) {
      console.log("error in conncting db", err);
    }
  }

  module.exports = connectToMongoDB