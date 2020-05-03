import nodemailer from "nodemailer";
const nodemailer_sendgrid = require("nodemailer-sendgrid");

export const sendMail = (
  email: string,
  message: string,
  subject: string,
  res: any
) => {
  let transporter: any = nodemailer.createTransport(
    nodemailer_sendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );
  // let transporter: any = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL_MAIL_AUTH,
  //     pass: process.env.PASSWORD_MAIL_AUTH,
  //   },
  // });

  const mailOptions = {
    from: process.env.EMAIL_MAIL_AUTH,
    to: email,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err: Error, data: any) => {
    if (err) res.json({ error: "Something went wrong!!!" });
    else res.json({ success: "Email sent successfully!!!" });
  });
};
