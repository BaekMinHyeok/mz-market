const mongoose = require("mongoose");
const userSchema = require("./schemas/user");

exports.User = mongoose.model("User", userSchema);
