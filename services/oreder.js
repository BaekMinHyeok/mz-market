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
    const { name, phoneNumber, address, address2, comments, objectId, price, quantity } = info;
    let orderId;
    // 가장 최신 값 가져오기
    try{
      const vl = this.OrderModel.findOne().sort({ _id: -1 });
      const data = await vl.exec();
      orderId = data.orderId + 1;
    } catch (error){
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
        product: [objectId],
        price,
        quantity,
      });
    } catch (error) {
      return error;
    }
  }

  //주문 정보 변경
  async update(orderId, updatedInfo) {
    const update = await this.OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { $set: updatedInfo },
      { new: true }
    );
    return update;
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

  //주문 삭제
  async deleteOrder(orderId) {
    return await this.OrderModel.deleteOne({ _id: orderId });
  }

  //배송 상태 수정
  async updateStatus(orderId, status) {
    const order = await this.OrderModel.findeOne(orderId);

    if (!order) {
      throw "주문 정보를 찾을 수 없습니다.";
    }

    order.status = status;
    await order.save();
  }
}

exports.order = new OrderService(Order);
