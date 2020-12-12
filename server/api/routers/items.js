const express = require('express');
const items = express.Router();

const ItemController = require('../controllers/ItemController');

// Get all the items
items.get('/', ItemController.findAll);

// Get items from one list
items.get('/:listId', ItemController.findItemsFromList);

// Get one item
items.get('/:itemId', ItemController.findOne);

// Create a new item
items.post('/', ItemController.create);

// Delete an item
items.delete('/:itemId', ItemController.delete);

module.exports = items;
