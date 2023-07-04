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
  try {
    const token = await user.login({
      email: req.body.email,
      pw: req.body.pw,
    });
    res.cookie("token", token);
    console.log(token);
  } catch (error) {
    res.send(error);
  }
};

//Token 체크
const auth = async (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    return next();
  } catch (error) {
    // 토큰의 키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.json({
        message: "유효하지 않은 토큰입니다.",
      });
    }
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

module.exports = { register };
