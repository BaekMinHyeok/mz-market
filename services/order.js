const { Order } = require("../models");
const { Product } = require("../models");
require("dotenv").config();
class OrderService {
  constructor(Order) {
    this.OrderModel = Order;
    this.ProductModel = Product;
  }

  //주문하기
  async register(info) {
    const {
      name,
      phoneNumber,
      address,
      address2,
      comments,
      price,
      quantity,
      email,
      productInfo,
    } = info;
    let orderId;
    // 가장 최신 값 가져오기
    try {
      const vl = this.OrderModel.findOne().sort({ _id: -1 });
      const data = await vl.exec();
      orderId = data.orderId + 1;
    } catch (error) {
      orderId = 1;
    }

    try {
      await this.OrderModel.create({
        orderId,
        name,
        phoneNumber,
        address,
        address2,
        comments,
        status: "ready",
        price,
        quantity,
        email,
        productInfo,
      });
      return orderId;
    } catch (error) {
      return error;
    }
  }

  async update(orderId, productCountArray, productIdArray) {
    const order = await this.OrderModel.findOne({ orderId: orderId });
    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    // productIdArray와 동일한 순서로 productCount를 수정한다.
    productIdArray.forEach((productId, index) => {
      const productInfo = order.productInfo.find(
        (product) => product.productId === productId
      );
      if (productInfo) {
        productInfo.productCount = productCountArray[index];
      }
    });

    await order.save();
  }

  //주문 조회 (관리자)
  async getAll() {
    return await this.OrderModel.find();
  }

  // 이메일검색 주문 정보 조회
  async getOrderByEmail(email, phoneNumber) {
    return await this.OrderModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });
  }

  // 이메일로 주문 조회
  async getOrderUser(email) {
    return await this.OrderModel.find({
      email: email,
    });
  }

  //주문 삭제
  async deleteOrder(orderId) {
    return await this.OrderModel.deleteOne({ orderId: orderId });
  }

  //배송 상태 수정
  async updateStatus(orderId, status) {
    // console.log(orderId);
    const order_ = await this.OrderModel.findOne({ orderId: orderId });
    // console.log("order", order_);
    if (!order_) {
      throw "주문 정보를 찾을 수 없습니다.";
    }

    order_.status = status;
    await order_.save();
  }
}

exports.order = new OrderService(Order);
