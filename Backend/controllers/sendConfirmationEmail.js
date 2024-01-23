const nodemailer = require("nodemailer");
require("dotenv").config();

const sendConfirmationEmail = async ({ from, to, subject, text }) => {
  // send email for password reset and email confirmation

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.EMAILPORT,
    secure: process.env.SECURE,
    auth: {
      user: "finlunch.com@gmail.com",
      pass: process.env.EMAILPASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: from,
        to: to,
        subject: subject,
        text: text,
      },
      (err, info) => {
        if (err) {
          console.log("error sendiegasdefiouhjpbhioulndfs")
          console.error(err);
          reject(err);
        } else {
          console.log("succes dfgdfdgfdgfdfgdgf")
          resolve(info);
        }
      }
    );
  });
};

module.exports = sendConfirmationEmail;
