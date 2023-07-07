const mongoose = require("mongoose");
const userSchema = require("./schemas/user");
const productSchema = require("./schemas/product");
const categorySchema = require("./schemas/category");

exports.User = mongoose.model("User", userSchema);
exports.Product = mongoose.model("Product", productSchema);
exports.Category = mongoose.model("Category", categorySchema);
