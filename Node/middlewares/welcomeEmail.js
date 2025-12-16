require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ✅ Use Gmail's built-in config
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
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`, // ✅ Branded sender
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(message);
    console.log(`✅ Email Sent: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Email send failed: ${error.message}`);
    throw new Error('Email could not be sent!');
  }
};

module.exports = sendEmail;
