const { User } = require("../models");

class UserService {
  constructor(User) {
    this.userModel = User;
  }

  async add(userInfo) {
    const { name, email, pw } = userInfo;
    const newUser = await this.userModel.create({ name, email, pw });
    return newUser;
  }
}

exports.user = new UserService(User);
