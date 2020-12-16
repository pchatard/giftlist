const express = require('express');
const lists = express.Router();

const ListController = require('../controllers/ListController');
const { authorize } = require('../middlewares/authorize');

lists.get('/', ListController.findAll);
lists.get('/mine', ListController.findMine);
lists.get('/:listId', ListController.findOne);
lists.post('/', ListController.create);
lists.put('/:listId', authorize, ListController.update);
lists.delete('/:listId', authorize, ListController.delete);

module.exports = lists;
