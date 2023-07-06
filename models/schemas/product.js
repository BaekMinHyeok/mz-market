const { Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
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
  size:{
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["men", "women"],
    required: true,
  },
});

module.exports = productSchema;
