const express = require("express");
const router = express.Router();
const serveStatic = require("../utils/static");

router.use("/user/sign_up", serveStatic("join")); //회원 가입
router.use("/user/sign_in", serveStatic("login")); // 로그인
router.use("/user/info", serveStatic("mypage-myinfo")); // 마이페이지-유저정보 

module.exports = router;
