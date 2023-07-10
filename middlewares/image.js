const uuid4 = require("uuid4");
const multer = require("multer");
const path = require("path");
const serverPath = "http://localhost:3000";

//이미지 파일 필터링
const imageFilter = (req, file, cb) => {
  const ext = paht.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    // 이미지 파일인 경우
    cb(null, true);
  } else {
    // 이미지 파일이 아닌 경우
    cb(new Error("이미지 파일만 업로드 가능합니다.(.jpg, .jpeg, .png"), false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, "public/images");
    },
  }),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: imageFilter,
});

//<input type="file" name="myFile" />
const uploadMiddleware = upload.single("myFile");

module.exports = { uploadMiddleware };
