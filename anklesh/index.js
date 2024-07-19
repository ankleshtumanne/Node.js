const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const connectToMongoDB = require("./config");
require('dotenv').config()
let port = process.env.PORT || 8185

const app = express();
app.use(express.json());

app.use("/users",userRoutes)

app.listen(port, async () => {
  await connectToMongoDB();
  console.log("server started");
});


