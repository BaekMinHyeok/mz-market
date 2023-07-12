const { order } = require("../services/oreder");
const { product } = require("../services/product");
const jwt = require("jsonwebtoken");
// 주문 등록

const registerOrder = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      address,
      address2,
      comments,
      price,
      quantity,
      productId,
    } = req.body;

    let productName = [];
    for (const prId of productId) {
      const productInfo = await product.getProductById(prId);
      // console.log(productInfo.name);
      productName.push(productInfo.name);
    }
    // console.log(productName);
    const orderId = await order.register({
      name,
      phoneNumber,
      address,
      address2,
      comments,
      status: "ready",
      price,
      quantity,
      productName,
    });
    // console.log(orderId);
    res.json({
      success: true,
      message: "주문 등록에 성공했습니다.",
      productId: productId,
      orderId: orderId,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

// 주문 정보 수정
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedInfo = req.body;
    await order.update(orderId, updatedInfo);

    res.json({
      success: true,
      message: "주문정보 업데이트에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// 주문 정보 조회
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await order.getAll();
    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: allOrders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 이메일검색 주문 정보 조회
const getOrderByEmail = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const orders = await order.getOrderByEmail(email, phoneNumber);

    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 이메일검색 주문 정보 조회
const getOrderUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    const orders = await order.getOrderUser(decoded.email);
    console.log(orders);
    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 주문 삭제
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.deleteOrder(orderId);

    res.json({
      success: true,
      message: "주문 삭제에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;
    await order.updateStatus(orderId, status);

    res.json({
      success: true,
      message: "배송 상태를 업데이트 했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  registerOrder,
  updateOrder,
  getAllOrders,
  getOrderByEmail,
  deleteOrder,
  updateStatus,
  getOrderUser,
};
