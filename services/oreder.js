const { Order } = require("../models");
require("dotenv").config();
class OrderService {
  constructor(Order) {
    this.OrderModel = Order;
  }

  //주문하기
  async register(info) {
    const { name, phoneNumber, address, address2, comments } = info;
    try {
      await this.OrderModel.create({
        name,
        phoneNumber,
        address,
        address2,
        comments,
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

  
}

exports.order = new OrderService(Order);
