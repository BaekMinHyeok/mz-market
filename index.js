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

// const middleware = async (req, res) => {
//   res.send("OK");
//   const check = await user.register({
//     name: "test2",
//     email: "test2@gmail.com",
//     pw: "1234",
//   });
//   console.log(check);
// };

const middleware = async (req, res) => {
  res.send("OK");
  const check = await user.login({
    email: "test@gmail.com",
    pw: "1234",
  });
  console.log(check);
};

app.get("/", middleware);

// app.get("/:name", async (req, res) => {
//   const name = req.params.name;
//   const user = await User.find({ name: name });
//   res.send(user);
// });

// app.use("/posts", postsRouter);

app.listen(3000);
