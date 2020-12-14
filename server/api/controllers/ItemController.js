const Item = require('../services/ItemService');

class ItemController {
    static async findAll(req, res, next) {
        try {
            const lists = await Item.getAll(req.db);
            res.send(lists);
        } catch (error) {
            next(error);
        }
    }

    static async findItemsFromList(req, res, next) {
        try {
            const listItems = await Item.getItemsFromList(
                req.db,
                req.params.listId
            );
            res.send(listItems);
        } catch (error) {
            next(error);
        }
    }

    static async findOne(req, res, next) {
        try {
            const list = await Item.getOne(req.db, req.params.listId);
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const item = {
                ...req.body.item,
                created_at: Date(),
                modified_at: Date(),
            };
            const createdItem = await Item.create(req.db, item);
            res.send(createdItem);
        } catch (error) {
            next(error);
        }
    }

    static async favoritize(req, res, next) {
        try {
            const newState = req.body.newState;
            const newFavState = await Item.updateFavoriteState(
                req.db,
                req.params.itemId,
                newState
            );
            res.send(newFavState);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await Item.delete(req.db, req.params.itemId);
            res.send(true);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ItemController;
