const { user } = require("../../services/user");

const register = async (req, res) => {
  const check = await user.register({
    name: req.body.name,
    email: req.body.email,
    pw: req.body.pw,
  });
  res.send(check);
  console.log(check);
  //console.log(req.body);
};

module.exports = { register };
