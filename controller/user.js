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
    const update = await user.login({
      email: req.body.email,
      pw: req.body.pw,
      newPw: req.body.newPw,
      newName: req.body.newName,
    });
    res.json({
      success: true,
      message: "회원 정보를 수정했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await user.login({
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

module.exports = { register, login, updateUser, deleteAccount };
