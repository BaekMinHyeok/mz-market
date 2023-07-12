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
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  address2: {
    type: String,
    require: false,
  },
  comments: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["ready", "shipping", "complete"],
    require: true,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
  },
  quantity: {
    type: Number,
    trim: true,
    require: true,
  }
 
  
});

module.exports = orderSchema;
