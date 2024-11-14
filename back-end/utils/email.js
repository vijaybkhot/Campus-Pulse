import dotenv from "dotenv";

import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../config.env") });

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      return {
        sendMail: (mailOptions) =>
          sgMail.send({ ...mailOptions, from: this.from }), // Using SendGrid's send
      };
    }

    // Nodemailer transport for development
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    try {
      const html = pug.renderFile(
        `${__dirname}/../views/email/${template}.pug`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
        }
      );

      const mailOptions = {
        to: this.to,
        subject,
        html,
        text: htmlToText(html),
      };

      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error.response.body);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Campus Pulse Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
export default Email;
