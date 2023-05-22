const express = require('express');
const userController = require('../controllers/userController');

const Router = express.Router();

Router.post('/signup', userController.postSignup);

Router.post('/signin', userController.postSignin);

module.exports = Router;
