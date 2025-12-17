require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  socketTimeout: 15000,
});

const otpSendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `ExTracker <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`OTP Email Sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = otpSendEmail;
