const { User } = require("../models");

class UserService {
  constructor(User) {
    this.userModel = User;
  }

  //회원가입
  async register(userInfo) {
    const { name, email, pw } = userInfo;

    //이메일 중복 체크
    const check = await this.userModel.find({ email: email });
    if (check.length !== 0) {
      throw new Error("중복되는 이메일 주소 입니다.");
    }

    const newUser = await this.userModel.create({ name, email, pw });
    return newUser;
  }

  //로그인
  async login(userInfo) {
    const { email, pw } = userInfo;

    //회원정보에 존재하는 이메일인지 체크
    const check = await this.userModel.find({ email: email });
    if (check.length === 0) {
      throw new Error("존재하지 않는 이메일 주소 입니다.");
    }

    //비밀 번호 일치 여부 체크
    if (check[0].pw !== pw) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    //JWT 토큰 관련 추가 필요
  }
}

exports.user = new UserService(User);
