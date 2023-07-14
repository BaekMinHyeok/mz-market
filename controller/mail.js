const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
var appDir = path.dirname(require.main.filename);
let authNum;

const authMail = async (req, res) => {
  authNum = Math.random().toString().substring(2, 6);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/template/authMail.ejs",
    { authCode: authNum },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = {
    from: `noback`,
    to: req.body.email,
    subject: "회원가입을 위한 인증번호를 입력해주세요.",
    html: emailTemplete,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Finish sending email : " + info.response);
    // res.send(authNum);
    res.json({
      success: true,
    });
    transporter.close();
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to send email.");
  }
};

module.exports = { authMail, getAuthNum: () => authNum };
