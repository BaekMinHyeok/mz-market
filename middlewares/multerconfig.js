const multer = require('multer');

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/'); //파일 저장 경로
  },
  filename: (req, file, cb) => {
    cb(null, `${Data.now()}-${file.originalname}}`) //파일 이름
  }
});

const fileFilter = (req, file, cb) => {
  // const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1];

  if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
      req.fileValidationError = null;
      cb(null, true);
  } else {
      req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
      cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //최대 5MB
  },
});

module.exports = upload;