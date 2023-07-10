const { Schema } = require("mongoose");

const orderSchema = new Schema({
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
  }
  
});

module.exports = orderSchema;
