const express = require("express");
const router = express.Router();
const { register } = require("../middlewares/user");

router.get("/register", register);

module.exports = router;
