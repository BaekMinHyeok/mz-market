require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const { User } = require("./models");
const { user } = require("./services/user");
// const postsRouter = require("./routes/posts");

const app = express();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

const middleware = async (req, res) => {
  res.send("OK");
  const check = await user.add({
    name: "test",
    email: "이메일중복테스트",
    pw: "1234",
  });
  console.log(check);
};

app.get("/", middleware);

app.get("/:name", async (req, res) => {
  const name = req.params.name;
  const user = await User.find({ name: name });
  res.send(user);
});

// app.use("/posts", postsRouter);

app.listen(3000);
