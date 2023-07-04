const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updatePw,
  deleteAccount,
} = require("../middlewares/user");

router.get("/register", (req, res) => {
  res.send(`
        <form action="/api/register" method="post">
          <input type="text" name="name" value=""> <br>
          <input type="text" name="email" value=""> <br>
          <input type="text" name="pw" value=""> <br>
          <input type="submit" name="btn" value="회원가입">
        </form>
        `);
});

router.post("/register", register);

module.exports = router;
