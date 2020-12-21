const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const auth = require('./auth');
const users = require('./users');
const lists = require('./lists');
const gifts = require('./gifts');

const router = express.Router();

/** Authentication router */
router.use('/auth', auth);

/** Authentication middleware */
router.use(authenticate);

/** Users router */
router.use('/users', users);

/** Lists router */
router.use('/lists', lists);

/** Gifts router */
router.use('/gifts', gifts);

module.exports = router;
