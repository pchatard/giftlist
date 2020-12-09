const express = require('express');
const auth = require('./routers/auth');
const lists = require('./routers/lists');

const api = express.Router();

// Global router
api.use('/auth', auth);
api.use('/lists', lists);

// Exemple for error handling
api.post('/', (req, res, next) => {
    try {
        if (req.body.name === 'error') {
            throw new Error('prout');
        }
        res.send({
            msg: 'Hello, world!',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = api;
