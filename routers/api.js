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

/**
 RESTful 하게 수정 필요 
Ex) "/user" 라우트에 http method 값을 바꾸며 요청 
 */
//user
router.post("/register", register); //회원 가입
router.post("/login", login); //로그인
router.post("/update_user", auth, updateUser); //유저정보 수정
router.post("/get_user", auth, getUser); //유저정보 조회
router.post("/delete_user", auth, deleteUser); //회원 탈퇴

//product
router.post("/registerProduct", auth, registerProduct); //상품등록
router.get("/getAllProduct", getAllProduct); //모든 상품 목록
router.post("/getProductByName", getProductByName); //상품 이름 검색
router.post("/updateProduct", auth, updateProduct); //상품 업데이트
router.post("/deleteProduct/:productId", auth, deleteProduct); //상품 삭제

//category
router.post("/registerCategory", auth, registerCategory); //카테고리 등록
router.post("/updateCategory", auth, updateCategory); //카테고리 업데이트
router.post("/deleteCategory", auth, deleteCategory); //카테고리 삭제
router.post("/getAllCategory", auth, getAllCategory); //카테고리 조회

module.exports = router;
