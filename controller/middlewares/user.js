const { user } = require("../../services/user");

const register = async (req, res) => {
  try {
    const check = await user.register({
      name: req.body.name,
      email: req.body.email,
      pw: req.body.pw,
    });
    res.send(check);
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const token = await user.login({
    email: req.body.email,
    pw: req.body.pw,
  });
  res.cookie("token", token);
  console.log(token);

  /**
   * JWT 체크 추가해야됨
   */
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

module.exports = { register };
