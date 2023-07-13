const { Schema } = require("mongoose");

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCount: {
    //개수
    type: Number,
    required: true,
  },
  productSize: {
    //사이즈
    type: String,
    required: true,
  },
  // productColor: {
  //   //색상
  //   type: String,
  //   required: true,
  // },
  productPrice: {
    //가격
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ready", "shipping", "complete"],
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  productInfo: {
    type: [productSchema],
    required: true,
  },
});

module.exports = orderSchema;
