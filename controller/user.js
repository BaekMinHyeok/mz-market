const { user } = require("../services/user");

const register = async (req, res) => {
  try {
    await user.register({
      name: req.body.name,
      email: req.body.email,
      pw: req.body.pw,
    });
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

const login = async (req, res) => {
  try {
    const token = await user.login({
      email: req.body.email,
      pw: req.body.pw,
    });
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

const updateUser = async (req, res) => {
  try {
    await user.updateUser({
      email: req.body.email,
      pw: req.body.pw,
      newPw: req.body.newPw,
      newName: req.body.newName,
    });
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

const getUser = async (req, res) => {
  try {
    const userData = await user.getUser({
      email: req.email,
    });
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

const deleteUser = async (req, res) => {
  try {
    await user.delete({
      email: req.body.email,
      pw: req.body.pw,
    });
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
