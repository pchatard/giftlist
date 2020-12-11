const express = require('express');
const cors = require('cors');
const auth = express.Router();
const AuthController = require('../controllers/AuthController');

auth.post('/local/register', AuthController.register);
auth.post('/local/login', AuthController.login);
auth.get(
    '/local/signout',
    cors({ origin: process.env.CLIENT_URL, credentials: true }),
    AuthController.signout
);

module.exports = auth;
