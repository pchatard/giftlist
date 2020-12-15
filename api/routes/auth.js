const express = require('express');
const auth = express.Router();
const AuthController = require('../controllers/AuthController');

auth.post('/local/register', AuthController.register);
auth.post('/local/login', AuthController.login);
auth.get('/local/signout', AuthController.signout);

module.exports = auth;
