require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const api = require("./controller/routers/api");
const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.use("/api", api);

app.listen(3000);
