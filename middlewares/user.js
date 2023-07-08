const jwt = require("jsonwebtoken");
//Token 체크
const auth = async (req, res, next) => {
  try {
    // const decoded = jwt.verify(
    //   req.headers.authorization.split(" ")[1],
    //   process.env.SECRET
    // );
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    req.email = decoded.email;
    return next();
  } catch (error) {
    // 토큰의 키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.json({
        message: "유효하지 않은 토큰입니다!!",
      });
    }
  }
};

module.exports = {
  auth,
};
