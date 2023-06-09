const express = require('express');

const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/auth');
const { isSeller } = require('../middlewares/seller');
const { isBuyer } = require('../middlewares/buyer');

const Router = express.Router();

Router.post('/create', isAuthenticated, isSeller, productController.postCreate);

Router.get('/get/all', isAuthenticated, productController.getAll);

Router.post('/buy/:productID', isAuthenticated, isBuyer, productController.postBuyer);

module.exports = Router;