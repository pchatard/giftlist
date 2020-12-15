const express = require('express');
const gifts = express.Router();

const GiftController = require('../controllers/GiftController');
const { authorize } = require('../middlewares/authorize');

gifts.get('/', GiftController.findAll);
gifts.get('/:listId', GiftController.findItemsFromList);
gifts.get('/:itemId', GiftController.findOne);

gifts.post('/:listId', authorize, GiftController.create);
gifts.put('/:listId/:itemId/fav', authorize, GiftController.favoritize);
gifts.delete('/:listId/:itemId', authorize, GiftController.delete);

module.exports = gifts;
