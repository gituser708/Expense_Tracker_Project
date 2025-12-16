const express = require('express');
const transactionCtrl = require('../controller/transactionCtrl');
const verifyCookie = require('../middlewares/verifyCookie');


const transactionRouter = express.Router();

transactionRouter.post('/api/v1/transactions/create', verifyCookie, transactionCtrl.create);
transactionRouter.get('/api/v1/transactions/lists', verifyCookie,
    transactionCtrl.getFilteredTransactions);
transactionRouter.put('/api/v1/transactions/update/:id', verifyCookie, transactionCtrl.update);
transactionRouter.delete('/api/v1/transactions/delete/:id',verifyCookie, transactionCtrl.delete);


module.exports = transactionRouter;