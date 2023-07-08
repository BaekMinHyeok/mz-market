const { user } = require("../services/user");

// 회원가입
const register = async (req, res) => {
  try {
    const { name, email, pw} = req.body;
    await user.register({name,email,pw,})
    res.json({
      success: true,
      message: "회원가입에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// 로그인
const login = async (req, res) => {
  try {
    const {email, pw} = req.body;
    await user.login({email, pw})
    res.json({
      success: true,
      message: "로그인에 성공했습니다.",
      token: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      token: undefined,
    });
  }
};

// 회원 정보 수정
const updateUser = async (req, res) => {
  try {
    const {email, pw, newPw, newName} = req.body;
    await user.updateUser({email, pw, newPw, newName})
    res.json({
      success: true,
      message: "회원정보를 수정했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

//회원 정보 조회
const getUser = async (req, res) => {
  try {
    const {email} = req.body;
    const userData = await user.getUser({email})
    res.json({
      success: true,
      message: "유저 정보를 조회합니다.",
      user: userData,
    });
    /**
     * 주문 관련 정보 추가 필요
     */
  } catch (error) {
    res.json({
      success: false,
      message: error,
      user: undefined,
    });
  }
};
// 회원 탈퇴
const deleteUser = async (req, res) => {
  try {
    const {email, pw} = req.body;
    await user.delete({email, pw})
    res.json({
      success: true,
      message: "회원탈퇴에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

module.exports = { register, login, updateUser, getUser, deleteUser };
