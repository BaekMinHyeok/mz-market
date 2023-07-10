const express = require("express");
const { auth } = require("../middlewares/user");
const router = express.Router();
//user
const {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user");
//product
const {
  registerProduct,
  uploadImg,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controller/product");
//category
const {
  registerCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controller/category");
//order
const {
  registerOrder,
  updateOrder,
  getAllOrders,
  getOrderByEmail,
  deleteOrder,
} = require("../controller/order");
//image
const { uploadMiddleware } = require("../middlewares/image");

//user
router.post("/user", register); //회원 가입
router.put("/user", auth, updateUser); //회원 정보 수정
router.get("/user", auth, getUser); //회원 정보 조회
router.delete("/user", auth, deleteUser); //회원 탈퇴

//login
router.post("/login", login); //로그인

//product
router.post("/product", auth, registerProduct); //상품등록
router.put("/product/:productId", auth, updateProduct); //상품 업데이트
router.get("/product", getAllProduct); //모든 상품 목록
router.get("/product/:productId", getProductById); //productId로 상품 정보 가져오기
router.get("/product/search/:search", getProductByName); //상품 이름 검색

router.delete("/product/:productId", auth, deleteProduct); //상품 삭제

//category
router.post("/category", auth, registerCategory); //카테고리 등록
router.put("/category", auth, updateCategory); //카테고리 업데이트
router.get("/category", auth, getAllCategory); //카테고리 조회
router.delete("/category/:categoryId", auth, deleteCategory); //카테고리 삭제

//order
router.post("/order", auth, registerOrder); //주문 등록
router.put("/order", auth, updateOrder); //주문 정보 수정
router.get("/order", auth, getAllOrders); //전체 주문 정보 조회
router.get("/order/email", auth, getOrderByEmail); //이메일검색 주문 정보 조회
router.delete("/order", auth, deleteOrder); //주문 정보 삭제

module.exports = router;
