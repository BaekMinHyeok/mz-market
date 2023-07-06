const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user");

router.post("/register", register); //회원 가입
router.post("/login", login); //로그인
router.post("/update_user", updateUser); //유저정보 수정
router.post("/get_user", getUser); //유저정보 조회
router.post("/delete_user", deleteUser); //회원 탈퇴

module.exports = router;
