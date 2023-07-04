require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { user } = require("./services/user");
// const postsRouter = require("./routes/posts");

const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const middleware = async (req, res) => {
  res.send("OK");
  const check = await user.login({
    email: "test2@gmail.com",
    pw: "1234",
  });
  console.log(check);
};

app.get("/", middleware);


app.listen(3000);
