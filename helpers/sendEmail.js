let nodemailer = require("nodemailer");
let { EMAIL, EMAIL_PASS, EMAIL_SERVICE } = require("../config/index");
let transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS
  }
});

// var mailOptions = {
//   from: EMAIL,
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

let sendEmail = async mailOptions => {
    mailOptions.from = EMAIL;
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error)
        throw new Error(`can't send mail message for this email : ${mailOptions.to}`);
    }
}

module.exports = sendEmail;