const jwt = require("jsonwebtoken");
//Token 체크
const adminAuth = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    // const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    // console.log(decoded.admin);
    if (decoded.admin) {
      return next();
    } else {
      return res.josn({
        message: "관리자만 접근 가능한 페이지입니다!",
      });
    }
  } catch (error) {
    // 토큰의 키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.json({
        message: "유효하지 않은 토큰입니다!!",
      });
    }
  }
};

//어드민 체크
const adminCheck = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    if (decoded.admin) {
      return res.json({
        success: true,
      });
    } else {
      return res.josn({
        success: false,
        message: "관리자만 접근 가능한 페이지입니다!",
      });
    }
  } catch (error) {
    // 토큰의 키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "유효하지 않은 토큰입니다!!",
      });
    }
  }
};

module.exports = {
  adminAuth,
  adminCheck
};
