require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const message = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };
        const info = await transporter.sendMail(message);
        console.log(`Email Sent ${info.messageId}`);
    } catch (error) {
        console.error(error);
        throw new Error('Email could not be sent!');
    };
};

module.exports = sendEmail;