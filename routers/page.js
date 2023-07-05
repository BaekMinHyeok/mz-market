const express = require("express");
const router = express.Router();
const serveStatic = require("../utils/static");

router.use("/register", serveStatic("join"));

module.exports = router;
