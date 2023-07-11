const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = userSchema;
