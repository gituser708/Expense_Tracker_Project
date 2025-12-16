require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const otpSendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false, 
      },
      socketTimeout: 10000, 
    });

    const message = {
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(message);
    console.log(`OTP Sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Email send failed: ${error.message}`);
    throw new Error('Email could not be sent!');
  }
};

module.exports = otpSendEmail;
