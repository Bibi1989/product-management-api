"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid = require("nodemailer-sendgrid");
exports.sendMail = (email, message, subject, res) => {
    // let transporter: any = nodemailer.createTransport(
    //   nodemailer_sendgrid({
    //     apiKey: process.env.SENDGRID_API_KEY,
    //   })
    // );
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
        },
    });
    const mailOptions = {
        from: "app169844034@heroku.com",
        to: email,
        subject,
        text: message,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err)
            res.json({ error: "Something went wrong!!!" });
        else
            res.json({ success: "Email sent successfully!!!" });
    });
};
//# sourceMappingURL=mail.js.map