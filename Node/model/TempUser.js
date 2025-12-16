const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
        default: ''
    },
    otpCode: {
        type:Number
    },
    otpExpires: {
        type: Date
    },
    attempts: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const TempUser = mongoose.model('TempUser', tempUserSchema);
module.exports = TempUser;