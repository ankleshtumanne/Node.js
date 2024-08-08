const mongoose=require("mongoose")

const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };

module.exports=connectToDB