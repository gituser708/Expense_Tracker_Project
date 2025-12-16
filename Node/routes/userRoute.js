const express = require('express');
const userCtrl = require('../controller/userCtrl');
const verifyCookie = require('../middlewares/verifyCookie');
const { upload,uploadToCloudinary } = require('../middlewares/upload');

const userRouter = express.Router();

userRouter.post("/api/v1/users/register", upload.single('profilePic'),
  uploadToCloudinary, userCtrl.registerTempUser);
userRouter.post("/api/v1/users/verify-otp",userCtrl.register);
userRouter.post("/api/v1/users/resend-otp", userCtrl.resendOtp);

userRouter.post("/api/v1/users/login", userCtrl.login);

userRouter.get('/api/v1/users/me', verifyCookie, (req, res) => {
  res.status(200).json({ user: req.user });
});
userRouter.post('/api/v1/users/logout', userCtrl.logout);

userRouter.get("/api/v1/users/profile", verifyCookie, userCtrl.profile);

userRouter.post("/api/v1/users/forgot-password", userCtrl.forgotPassword);
userRouter.get("/api/v1/users/validate-reset-token/:token", userCtrl.validateResetToken);
userRouter.put("/api/v1/users/reset-password/:token", userCtrl.resetPassword);

module.exports = userRouter;