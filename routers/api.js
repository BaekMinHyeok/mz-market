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
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByGender,
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
  updateStatus,
} = require("../controller/order");
//image
const { uploadMiddleware } = require("../middlewares/image");
const { authMail } = require("../controller/mail");
const { adminAuth } = require("../middlewares/admin");
router.post("/mail", authMail);

//user
router.post("/user", register); //회원 가입
router.put("/user", auth, updateUser); //회원 정보 수정
router.get("/user", auth, getUser); //회원 정보 조회
router.delete("/user", auth, deleteUser); //회원 탈퇴

//login
router.post("/login", login); //로그인

//product
router.post("/product", adminAuth, uploadMiddleware, registerProduct); //상품등록
router.put("/product/:productId", adminAuth, uploadMiddleware, updateProduct); //상품 업데이트
router.get("/product", getAllProduct); //모든 상품 목록
router.get("/product/:productId", getProductById); //productId로 상품 정보 가져오기
router.get("/product/search/:search", getProductByName); //상품 이름 검색
router.get("/product/gender/:gender", getProductByGender); //성별로 데이터 리턴
router.delete("/product/:productId", adminAuth, deleteProduct); //상품 삭제

//category
router.post("/category", adminAuth, registerCategory); //카테고리 등록
router.put("/category", adminAuth, updateCategory); //카테고리 업데이트
router.get("/category", adminAuth, getAllCategory); //카테고리 조회
router.delete("/category/:name", adminAuth, deleteCategory); //카테고리 삭제

//order
router.post("/order", registerOrder); //주문 등록
router.put("/order/:orderId", updateOrder); //주문 정보 수정
router.put("/order/status/update", updateStatus); //배송 상태 수정
router.get("/order", getAllOrders); //전체 주문 정보 조회
router.get("/order/email", getOrderByEmail); //이메일검색 주문 정보 조회
router.delete("/order/:orderId", deleteOrder); //주문 정보 삭제

module.exports = router;
