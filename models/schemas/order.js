const { Schema } = require("mongoose");

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
  productName: {
    type: [String],
    required: true,
  },
  productId: {
    type: [Number],
    required: true,
  },
  productCount: {
    type: [Number],
    required: true,
  },
  productSize: {
    type: [String],
    required: true,
  },
  productColor: {
    type: [String],
    required: true,
  },
  productPrice: {
    type: [Number],
    required: true,
  },
});

module.exports = orderSchema;
