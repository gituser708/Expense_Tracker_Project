const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"]
    },
    category: {
        type: String,
        required: true,
        default: "Uncategorized",
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date(),
        required: false
    },
    description: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;