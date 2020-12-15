const express = require('express');
const lists = express.Router();

const ListController = require('../controllers/ListController');

lists.get('/', ListController.findAll);
lists.get('/mine', ListController.findMine);
lists.get('/:listId', ListController.findOne);
lists.post('/', ListController.create);
lists.delete('/:listId', ListController.delete);

module.exports = lists;
