const Gift = require('../services/GiftService');

class GiftController {
    static async findAll(req, res, next) {
        try {
            const lists = await Gift.getAll(req.db);
            res.send(lists);
        } catch (error) {
            next(error);
        }
    }

    static async findItemsFromList(req, res, next) {
        try {
            const listItems = await Gift.getItemsFromList(
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
            const list = await Gift.getOne(req.db, req.params.listId);
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const gift = {
                ...req.body.gift,
                created_at: Date(),
                modified_at: Date(),
            };
            const createdItem = await Gift.create(req.db, gift);
            res.send(createdItem);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const gift = req.body;
            const updatedItem = await Gift.update(
                req.db,
                req.params.giftId,
                gift
            );
            res.send(updatedItem);
        } catch (error) {
            next(error);
        }
    }

    static async favoritize(req, res, next) {
        try {
            const newState = req.body.newState;
            const newFavState = await Gift.updateFavoriteState(
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
            await Gift.delete(req.db, req.params.itemId);
            res.send(true);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GiftController;
