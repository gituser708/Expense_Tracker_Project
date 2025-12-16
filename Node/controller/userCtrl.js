require('dotenv').config({ quiet: true });
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../middlewares/welcomeEmail');
const resetPasswordEmail = require('../middlewares/resetPasswordEmail');
const otpSendEmail = require('../middlewares/otpSendEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const TempUser = require('../model/TempUser');
const User = require('../model/User');
const setCookie = require('../utils/setCookie');


const userCtrl = {
    registerTempUser: asyncHandler(async (req, res) => {
         const { username, email, age, gender, password } = req.body;

        if (!username || !email || !age || !gender || !password) {
            res.status(301);
            throw new Error('All fields are required!');
        };
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400);
            throw new Error(`User already exist with this email ${email}`);
        };
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const profilePic = req.body.profilePic || '';

        const otp = crypto.randomInt(100000, 999999);
        const otpExpires = Date.now() + 1000 * 60 * 10;

        await TempUser.findOneAndUpdate(
            { email },
            {
                username, email, age, gender, profilePic,
                password: hashPassword, otpCode: otp, otpExpires, attempts: 0
            },
            { upsert: true }
        );

        const templatePath = path.join(__dirname, '../html/sendOtpEmail.html');
        let html = fs.readFileSync(templatePath, 'utf-8');
        html = html.replace('{{username}}', username);
        html = html.replace('{{OTP}}', otp);

        await otpSendEmail({
            to: email,
            subject: 'OTP Verification',
            html: html
        });

        res.status(200).json({ message: 'OTP sent to email' });
    }),

    resendOtp: asyncHandler(async (req, res) => {
        const { email } = req.body;
        const tempUser = await TempUser.findOne({ email });

        if (!tempUser) {
            res.status(400);
            throw new Error('No pending registration found!');
        };

        const otp = crypto.randomInt(100000, 999999);
        const otpExpires = Date.now() + 1000 * 60 * 10;

        tempUser.otpCode = otp;
        tempUser.otpExpires = otpExpires;
        tempUser.attempts = 0;
        await tempUser.save();

        const templatePath = path.join(__dirname, '../html/sendOtpEmail.html');
        let html = fs.readFileSync(templatePath, 'utf-8');
        html = html.replace('{{username}}', tempUser.username);
        html = html.replace('{{OTP}}', tempUser.otpCode);

        await sendEmail({
            to: email,
            subject: 'OTP Verification',
            html: html
        });

        res.status(200).json({ message: 'New OTP has been sent' });
    }),


    register: asyncHandler(async (req, res,) => {
        const { email, otp } = req.body;
        
        const user = await TempUser.findOne({ email });

        if (!user) {
            res.status(404);
            throw new Error('No user found!');
        };

        if (user.otpExpires < Date.now()) {
            await TempUser.deleteOne({ email });
            res.status(400);
            throw new Error('0TP expired!');
        };

        if (user.otpCode !== Number(otp)) {
            user.attempts += 1;
            await user.save();
            res.status(400)
            throw new Error('Invalid OTP');
        };

        const newUser = new User({
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
            password: user.password,
            profilePic: user.profilePic
        });

        await newUser.save();
        await TempUser.deleteOne({ email });

        
        const templatePath = path.join(__dirname, "../html/welcomeEmail.html");
        let html = fs.readFileSync(templatePath, 'utf-8');

        html = html.replace("{{username}}", newUser.username);

        await sendEmail({
            to: newUser.email,
            subject: 'Greeting',
            html
        });

        res.status(201).send({
            message: 'User has been successfully registered',
        });
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password!');
        };
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '30d' });

        setCookie(res, token);
        res.status(200).json({
            message: 'You have successfully logged in'
        });
    }),

    logout: asyncHandler(async (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        });
        res.status(200).json({ message: 'You are logged out' });
    }),

    profile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user).select("-password");
        res.json({user});
    }),

    forgotPassword: asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error(`No user found with this email ${email}`);
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const templatePath = path.join(__dirname, "../html/resetPassword.html");

  let html = fs.readFileSync(templatePath, "utf-8");
   html = html.replace("{{RESET_URL}}",
  `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:auto;">
    <tr>
      <td align="center" bgcolor="#2F67F6" style="border-radius:6px;">
        <a href="${resetUrl}" target="_blank"
          style="display:inline-block; padding:14px 28px; font-family:Helvetica, Arial, sans-serif;
                 font-size:16px; color:#ffffff; text-decoration:none; border-radius:6px;">
          Reset Password
        </a>
      </td>
    </tr>
  </table>`
);


  html = html.replace("{{username}}", user.username);

  await resetPasswordEmail({
    to: user.email,
    subject: "Reset password email",
    html: html
  });

  res.status(200).json({ message: "Reset link sent" });
}),


    validateResetToken: asyncHandler(async (req, res) => {
        const { token } = req.params;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            res.status(400);
            throw new Error('Invalid or expire token');
        };

        res.json(200).json({
            message: 'Token valid'
        });
    }),

    resetPassword: asyncHandler(async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400);
            throw new Error('Invalid or expire token');
        };

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    }),
};

module.exports = userCtrl;

