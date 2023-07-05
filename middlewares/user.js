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

module.exports = { auth };
