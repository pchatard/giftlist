const express = require('express');
const users = express.Router();

const UserController = require('../controllers/UserController');

users.get('/me', UserController.me);

module.exports = users;
