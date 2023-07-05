const mongoose = require("mongoose");
const userSchema = require("./schemas/user");
const productSchema = require("./schemas/product");

exports.User = mongoose.model("User", userSchema);
exports.Product = mongoose.model("Product", productSchema);
