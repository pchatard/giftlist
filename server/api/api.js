const express = require('express');
const cors = require('cors');
const auth = require('./routers/auth');
const lists = require('./routers/lists');
const { authenticateUser } = require('./helpers/authentication');

const api = express.Router();

// Global router
api.use('/auth', cors(), auth);
api.use(
    cors({ origin: process.env.CLIENT_URL, credentials: true }),
    authenticateUser
);
api.use('/lists', lists);

module.exports = api;
