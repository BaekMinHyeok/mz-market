const multer = require('multer');

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/'); //파일 저장 경로
  },
  filename: (req, file, cb) => {
    cb(null, `${Data.now()}-${file.originalname}}`) //파일 이름
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //최대 5MB
  },
});

module.exports = upload;