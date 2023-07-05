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
      code: 200,
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "로그인에 실패했습니다.",
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
  const result = await user.login({
    email: req.body.email,
    pw: req.body.pw,
  });
  res.send(result);
  console.log(result);
};

module.exports = { register, login, updatePw, deleteAccount };
