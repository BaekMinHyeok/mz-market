const { Schema } = require("mongoose");

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["men", "women"],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = productSchema;
