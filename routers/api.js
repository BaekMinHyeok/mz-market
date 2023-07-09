const express = require("express");
const { auth } = require("../middlewares/user");
const router = express.Router();
const {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user");
const {
  registerProduct,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

router.post("/user", register); //회원 가입
router.put("/user", auth, updateUser); //회원 정보 수정
router.get("/user", auth, getUser); //회원 정보 조회
router.delete("/user", auth, deleteUser); //회원 탈퇴

router.post("/login", login); //로그인

router.post("/registerProduct", auth, registerProduct); //상품등록
router.get("/getAllProduct", getAllProduct); //모든 상품 목록
router.post("/getProductByName", getProductByName); //상품 이름 검색
router.post("/updateProduct", auth, updateProduct); //상품 업데이트
router.post("/deleteProduct/:productId", auth, deleteProduct); //상품 삭제

module.exports = router;
