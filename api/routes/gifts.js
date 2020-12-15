const express = require('express');
const gifts = express.Router();

const GiftController = require('../controllers/GiftController');

gifts.get('/', GiftController.findAll);
gifts.get('/:listId', GiftController.findItemsFromList);
gifts.get('/:itemId', GiftController.findOne);
gifts.post('/', GiftController.create);
gifts.put('/:itemId/fav', GiftController.favoritize);
gifts.delete('/:itemId', GiftController.delete);

module.exports = gifts;
