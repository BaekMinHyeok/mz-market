const mongoose = require("mongoose");
const userSchema = require("./schemas/user");
const productSchema = require("./schemas/product");
const categorySchema = require("./schemas/category");
const orderSchema = require("./schemas/order");

exports.User = mongoose.model("User", userSchema);
exports.Product = mongoose.model("Product", productSchema);
exports.Category = mongoose.model("Category", categorySchema);
exports.Order = mongoose.model("Order", orderSchema);
