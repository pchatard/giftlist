const express = require('express');
const auth = require('./routers/auth');
const lists = require('./routers/lists');
const { authenticateUser } = require('./helpers/authentication');

const api = express.Router();

// Global router
api.use('/auth', auth);
api.use(authenticateUser);
api.use('/lists', lists);

module.exports = api;
