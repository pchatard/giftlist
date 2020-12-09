const express = require('express');
const lists = express.Router();

const ListController = require('../controllers/ListController');

// Get all the lists
lists.get('/', ListController.findAll);

// Get one list
lists.get('/:listId', ListController.findOne);

// Create a new list
lists.post('/', ListController.create);

// Delete a list
lists.delete('/:listId', ListController.delete);

module.exports = lists;
