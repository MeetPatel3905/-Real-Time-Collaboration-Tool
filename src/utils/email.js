import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (email, token, username) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Verification - Real-Time Collaboration Tool',
    html: `
      <h2>Welcome ${username}!</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${process.env.BACKEND_URL}/users/verifyemail/${token}">Verify Email</a>
      <p>If you didn't create this account, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const generateverificationToken = (email) => {
  return Buffer.from(email).toString('base64');
};
