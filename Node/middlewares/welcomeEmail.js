require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
      const transporter = nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        secure: false,
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_SMTP_KEY,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        socketTimeout: 15000,
      });
      const message = {
        from: `ExTracker <${process.env.BREVO_USER}>`,
        to,
        subject,
        html,
      };
      const info = await transporter.sendMail(message);
      console.log(`Welcome Email Sent: ${info.messageId}`);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      throw new Error('Failed to send reset password email');
    };
};

module.exports = sendEmail;
