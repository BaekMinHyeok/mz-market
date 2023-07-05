const express = require("express");
const path = require("path");

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
const serveStatic = (resource) => {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };
  return express.static(resourcePath, option);
};

module.exports = serveStatic;
