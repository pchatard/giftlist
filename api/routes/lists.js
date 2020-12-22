const express = require('express');
const lists = express.Router();

const ListController = require('../controllers/ListController');
const { authorize } = require('../middlewares/authorize');
const { preventOwner } = require('../middlewares/shared');

/** Finds all lists */
lists.get('/', ListController.findAll);

/** Finds all of the logged in user's lists */
lists.get('/mine', ListController.findMine);

/** Finds the listId list */
lists.get('/:listId', ListController.findOne);

/** Creates a new list */
lists.post('/', ListController.create);

/** Updates the listId list */
lists.put('/:listId', authorize, ListController.update);

/** Deletes the listId list */
lists.delete('/:listId', authorize, ListController.delete);

/** Makes a list shared */
lists.get('/:listId/share', authorize, ListController.share);

/** Finds the sharingCode shared list  */
lists.get('/shared/:sharingCode', preventOwner, ListController.findSharedList);

/** Makes a shared list private */
lists.get('/:listId/private', authorize, ListController.private);

module.exports = lists;
