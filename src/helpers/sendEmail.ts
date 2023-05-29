import nodemailer from "nodemailer";
import Token from "@/models/tokenModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log(userId.toString());
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);
    const newToken = new Token({
      userId: userId.toString(),
      token,
      emailType,
    });

    await newToken.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.auth_email,
        pass: process.env.auth_password,
      },
    });

    const mailOptions: any = {
      from: process.env.auth_email,
      to: email,
    };

    if (emailType === "emailVerification") {
      mailOptions.subject = "Email Verification";
      mailOptions.html = `
        <h1>Click on the link below to verify your email</h1>
        <a href="${process.env.domain}/verifyemail?token=${token}">Verify Email</a>
      `;
    } else {
      mailOptions.subject = "Reset Password";
      mailOptions.html = `
            <h1>Click on the link below to reset your password</h1>
            <a href="${process.env.domain}/resetpassword?token=${token}">Reset Password</a>
        `;
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
