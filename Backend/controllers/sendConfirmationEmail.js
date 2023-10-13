const nodemailer = require("nodemailer");
require("dotenv").config();

const sendConfirmationEmail = async ({ from, to, subject, text }) => {
  try {
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

    await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
    });
    console.log("email sent");
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendConfirmationEmail;
