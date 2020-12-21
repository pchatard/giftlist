const express = require('express');
const auth = express.Router();
const AuthController = require('../controllers/AuthController');

/** Registers a new user */
auth.post('/local/register', AuthController.register);

/** Logs a user in */
auth.post('/local/login', AuthController.login);

/** Logs a user out */
auth.get('/local/signout', AuthController.signout);

module.exports = auth;
