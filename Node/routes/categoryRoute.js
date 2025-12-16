const express = require('express');
const categoryCtrl = require('../controller/categoryCtrl');
const verifyCookie = require('../middlewares/verifyCookie');


const categoryRouter = express.Router();

categoryRouter.post('/api/v1/categories/create', verifyCookie, categoryCtrl.create);
categoryRouter.get('/api/v1/categories/lists', verifyCookie, categoryCtrl.lists);
categoryRouter.delete('/api/v1/categories/delete/:id', verifyCookie, categoryCtrl.delete);

module.exports = categoryRouter;