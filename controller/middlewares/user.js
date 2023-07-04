const { user } = require("../../services/user");

const register = async (req, res) => {
  const user = await user.register({
    name: req.body.name,
    email: req.body.email,
    pw: req.body.pw,
  });
  res.send(user);
  console.log(user);
};

const login = async (req, res) => {
  const token = await user.login({
    email: req.body.email,
    pw: req.body.pw,
  });
  res.cookie("token", token);
  console.log(token);
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
