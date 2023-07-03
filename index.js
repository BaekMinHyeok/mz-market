require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const { User } = require("./models");
const { userService } = require("./services/user");
// const postsRouter = require("./routes/posts");

const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const middleware = async (req, res) => {
  res.send("OK");
  // const newUser = new User();
  // newUser.name = "minhyeok";
  // newUser.email = "sihun@gmail.com";
  // newUser.pw = "1234";
  // await newUser.save();
  await user.add({ name: "test", email: "test@gmail.com", pw: "1234" });
};

app.get("/", middleware);

app.get("/:name", async (req, res) => {
  const name = req.params.name;
  const user = await User.find({ name: name });
  res.send(user);
});

// app.use("/posts", postsRouter);

app.listen(3000);
