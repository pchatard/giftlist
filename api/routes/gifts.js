const express = require('express');
const gifts = express.Router();

const GiftController = require('../controllers/GiftController');
const { authorize } = require('../middlewares/authorize');

/** Finds all gifts */
gifts.get('/', GiftController.findAll);

/** Finds all gifts from the listId list */
gifts.get('/:listId', GiftController.findGiftsFromList);

/** Finds the :giftId gift */
gifts.get('/:giftId', GiftController.findOne);

/** Creates a new gift in the listId list */
gifts.post('/:listId', authorize, GiftController.create);

/** Updates the giftId gift */
gifts.put('/:listId/:giftId', authorize, GiftController.update);

/** Toggles the favorite status of giftId gift  */
gifts.put('/:listId/:giftId/fav', authorize, GiftController.favoritize);

/** Deletes the giftId gift */
gifts.delete('/:listId/:giftId', authorize, GiftController.delete);

module.exports = gifts;
