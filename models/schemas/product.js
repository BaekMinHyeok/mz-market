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
  size:{
    type: [number],
    required: true,
  },
  category:{
    type: [number],
    required: true,
  },

});

module.exports = productSchema;
