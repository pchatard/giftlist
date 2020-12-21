const express = require('express');
const users = express.Router();

const UserController = require('../controllers/UserController');

/** Gets current user information */
users.get('/me', UserController.me);

module.exports = users;
