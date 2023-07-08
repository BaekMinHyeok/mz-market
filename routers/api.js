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

//login
router.post("/login", login); //로그인
//user
router.post("/register", register); //회원 가입
router.put("/update_user", auth, updateUser); //회원정보 수정
router.get("/get_user", auth, getUser); //회원정보 조회
router.delete("/delete_user", auth, deleteUser); //회원 탈퇴

//product
router.post("/registerProduct", auth, registerProduct); //상품등록
router.put("/updateProduct", auth, updateProduct); //상품 정보 수정
router.get("/getAllProduct", getAllProduct); //상품 정보 조회
router.delete("/deleteProduct/:productId", auth, deleteProduct); //상품 삭제

//category
router.post("/registerCategory", auth, registerCategory); //카테고리 등록
router.put("/updateCategory", auth, updateCategory); //카테고리 업데이트
router.get("/getAllCategory", auth, getAllCategory); //카테고리 조회
router.delete("/deleteCategory", auth, deleteCategory); //카테고리 삭제

//order
router.post("/registerOrder", auth, registerOrder); //주문 등록
router.put("/updateOrder", auth, updateOrder); //주문 정보 수정
router.get("/getAllOrders", auth, getAllOrders); //주문 정보 조회
router.delete("/deleteOrder", auth, deleteOrder); //주문 삭제


module.exports = router;
