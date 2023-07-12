const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor(User) {
    this.userModel = User;
  }

  //회원가입
  async register(userInfo) {
    const { name, email, pw } = userInfo;

    //이메일 중복 체크
    const check = await this.userModel.findOne({ email: email });
    if (check.length !== 0) {
      // throw new Error("중복되는 이메일 주소 입니다.");
      throw "중복되는 이메일 주소 입니다.";
    }

    await this.userModel.create({ name, email, pw });
  }

  //로그인
  async login(userInfo) {
    const { email, pw } = userInfo;

    //회원정보에 존재하는 이메일인지 체크
    const check = await this.userModel.find({ email: email });
    if (check.length === 0) {
      throw "존재하지 않는 이메일 주소 입니다.";
    }

    //비밀번호 일치 여부 체크
    if (check[0].pw !== pw) {
      throw "비밀번호가 일치하지 않습니다.";
    }

    //JWT 토큰 생성
    const token = jwt.sign(
      {
        type: "JWT",
        name: check[0].name,
        email: check[0].email,
        pw: check[0].pw,
        admin: check[0].admin,
      },
      process.env.SECRET
    );
    return token;
  }

  //회원정보 수정
  //이미 로그인이 된 상태에서만 호출해야함
  async updateUser(userInfo) {
    const { email, pw, newPw, newName } = userInfo;

    //비밀번호 일치 여부 체크
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw "사용자를 찾을 수 없습니다.";
    }

    if (user.pw !== pw) {
      throw "비밀번호가 일치하지 않습니다.";
    }

    user.pw = newPw;
    user.name = newName;
    await user.save();
  }

  //회원 정보 조회
  async getUser(userInfo) {
    const { email } = userInfo;

    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw "사용자를 찾을 수 없습니다.";
    }

    return user;
  }

  //회원 탈퇴
  async delete(userInfo) {
    const { email, pw } = userInfo;

    //비밀번호 일치 여부 체크
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw "사용자를 찾을 수 없습니다.";
    }

    if (user.pw !== pw) {
      throw "비밀번호가 일치하지 않습니다.";
    }

    await this.userModel.deleteOne({ email: email });
  }
}

exports.user = new UserService(User);
