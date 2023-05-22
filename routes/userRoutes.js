const express = require('express');
const userController = require('../controllers/userController');

const Router = express.Router();

Router.post('/signup', userController.postSignUp);

Router.post('/signin', userController.postSignIn);

Router.get('/signout', userController.getSignOut)

module.exports = Router;
