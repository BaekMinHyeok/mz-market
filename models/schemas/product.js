const { Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

module.exports = productSchema;
