const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models");
// const postsRouter = require("./routes/posts");

const app = express();

mongoose.connect(
  "mongodb+srv://elice_11:noback@cluster.ippvmlc.mongodb.net/test"
);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const middleware = async (req, res) => {
  res.send("OK");
  const newUser = new User();
  newUser.name = "minhyeok";
  newUser.email = "sihun@gmail.com";
  newUser.pw = "1234";
  await newUser.save();
};

app.get("/", middleware);

app.get("/:name", async (req, res) => {
  const name = req.params.name;
  const user = await User.find({ name: name });
  res.send(user);
});

// app.use("/posts", postsRouter);

app.listen(3000);
