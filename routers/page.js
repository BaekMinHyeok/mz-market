const express = require("express");
const router = express.Router();
const serveStatic = require("../utils/static");

//login
router.use("/", serveStatic("main")); //메인 페이지
//user
router.use("/user/sign_up", serveStatic("join")); //회원 가입
router.use("/user/sign_in", serveStatic("login")); // 로그인
router.use("/user/info", serveStatic("mypage-myinfo")); // 마이페이지-유저정보

//admin
router.use("/admin/products/add", serveStatic("adminpage_add")); //관리자 페이지 상품 추가
router.use("/admin/category/add", serveStatic("adminpage_category")); //관리자 페이지 카테고리 추가
router.use("/admin/products/list/", serveStatic("adminpage_list")); //관리자 페이지 상품 목록
router.use("/admin/order_history ", serveStatic("adminpage_order")); //관리자 페이지 주문 관리

//cart
router.use("/cart", serveStatic("cart")); //장바구니
router.use("/cart/order/", serveStatic("order")); //주문 페이지
router.use("/cart/order/complete/:orderId", serveStatic("orderComplete")); //주문 완료 페이지
router.use("/category/products/:productId", serveStatic("productsDetail")); //상품 상세 페이지
// router.use("/category/products?id=${productId}", serveStatic("productsDetail")); //상품 상세 페이지

module.exports = router;
