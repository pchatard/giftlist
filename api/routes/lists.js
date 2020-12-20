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

// Share a list, returns object with code and link
lists.get('/:listId/share', authorize, ListController.share);

// Get a shared list from a code or link
lists.get('/shared/:sharingCode', ListController.findSharedList);

module.exports = lists;
