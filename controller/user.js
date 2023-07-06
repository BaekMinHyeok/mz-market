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

const updatePw = async (req, res) => {
  const update = await user.login({
    email: req.body.email,
    pw: req.body.pw,
    newPw: req.body.newPw,
  });
  res.send(update);
  console.log(update);
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

module.exports = { register, login, updatePw, deleteAccount };
