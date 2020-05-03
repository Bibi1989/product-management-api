import nodemailer from "nodemailer";
const nodemailer_sendgrid = require("nodemailer-sendgrid");

export const sendMail = (email: string, message: string, subject: string) => {
  // let transporter: any = nodemailer.createTransport(
  //   nodemailer_sendgrid({
  //     apiKey: process.env.SENDGRID_API_KEY,
  //   })
  // );
  let transporter: any = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  const mailOptions = {
    from: "bibiaremieye1@gmail.com",
    to: email,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err: Error, data: any) => {
    if (err) console.log(err);
    else console.log("Email sent!!!");
  });
};
