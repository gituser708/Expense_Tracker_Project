const asyncHandler = require('express-async-handler');
const Transaction = require('../model/Transaction');

const transactionCtrl = {
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, description } = req.body;
        if (!type || !category || !amount || !description) {
            throw new Error('All fields are required');
        };
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            description
        });

        const formatTransactionDate = {
            ...transaction.toObject(),
            date: new Intl.DateTimeFormat('en-GB').format(transaction.date)
        };
        res.status(201).json({
            message: 'Transaction added successfully...',
            transaction: formatTransactionDate
        });
    }),

    getFilteredTransactions: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filters = { user: req.user };

        if (startDate) {
            filters.date = { ...filters.date, $gte: new Date(startDate) };
        };
        if (endDate) {
            filters.date = { ...filters.date, $lte: new Date(endDate) };
        };
        if (type) {
            filters.type = type;
        };
        if (category) {
            if (category === "All") {
            } else if (category === "Uncategorized") {
                filters.category =  "Uncategorized"
            } else {
                filters.category = category
            };
        };

        const filterTransactions = await Transaction.find(filters).sort({ date: -1 });
        res.json(filterTransactions);
    }),

    update: asyncHandler(async (req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction && transaction.user.toString() === req.user.toString()) {
            (transaction.type = req.body.type || transaction.type),
                (transaction.category = req.body.category || transaction.category),
                (transaction.amount = req.body.amount || transaction.amount),
                (transaction.description = req.body.description || transaction.description)
            
            const updateTransaction = await transaction.save();
            res.json(updateTransaction);
        };
    }),

    delete: asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: no user context' });
    }

    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found!' });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this transaction' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully!' });
  }),
};


module.exports = transactionCtrl;