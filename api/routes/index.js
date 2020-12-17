const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const auth = require('./auth');
const users = require('./users');
const lists = require('./lists');
const gifts = require('./gifts');

const router = express.Router();

// Global router
router.use('/auth', auth);
router.use(authenticate);
router.use('/users', users);
router.use('/lists', lists);
router.use('/gifts', gifts);

module.exports = router;
