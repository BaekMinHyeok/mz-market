require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const api = require("./routers/api");
const page = require("./routers/page");
const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <==== parse request body as JSON

mongoose.connect(process.env.DATABASE);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.use("/", page);
app.use("/api", api);

app.listen(3000);


