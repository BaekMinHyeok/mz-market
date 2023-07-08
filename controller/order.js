const { order } = require("../services/order");

// 주문 등록
const registerOrder = async (req, res) => {
  try {
    const { name, description, price, category, gender } = req.body;
    // const image = uploadImg(req, res);
    await order.register({
      name,
      description,
      price,
      category,
      gender,
      //  images: image.map((img) => img.filename)
    });
    res.json({
      success: true,
      message: "상품 등록에 성공했습니다.",
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
      message: "주문 업데이트에 성공했습니다.",
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
      message: "주문을 조회했습니다.",
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

// 주문 삭제
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.delete(orderId);

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

module.exports = {
  registerOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
};
