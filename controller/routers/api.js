const express = require("express");
const router = express.Router();
const { register } = require("../middlewares/user");
const path = require("path");

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
const serveStatic = (resource) => {
  const resourcePath = path.join(__dirname, `../../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
};

router.use("/register", serveStatic("join"));
router.post("/register", register);

module.exports = router;
