const express = require('express');

const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/auth');
const { isSeller } = require('../middlewares/seller');

const Router = express.Router();

Router.post('/create', isAuthenticated, isSeller, productController.postCreate);

Router.get('/get/all'.productController.getAll);

Router.post('/buy/:productID', productController.postBuyer);

module.exports = Router;