const { user } = require("../../services/user");

const register = async (req, res) => {
  res.send("OK");
  const check = await user.register({
    name: "sihun",
    email: "test@naver.com",
    pw: "1234",
  });
  console.log(check);
};

module.exports = { register };
