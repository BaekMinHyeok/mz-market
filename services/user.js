const { User } = require("../models");

class UserService {
  constructor(User) {
    this.userModel = User;
  }

  async add(userInfo) {
    const { name, email, pw } = userInfo;

    const check = await this.userModel.find({ email: email });
    if (check.length !== 0) {
      throw new Error("중복되는 이메일 주소 입니다.");
    }
    // console.log(check);

    const newUser = await this.userModel.create({ name, email, pw });
    return newUser;
  }
}

exports.user = new UserService(User);
