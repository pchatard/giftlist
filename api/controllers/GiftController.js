const Gift = require('../services/GiftService');

class GiftController {
    /**
     * Sends back all the gifts in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findAll(req, res, next) {
        try {
            const lists = await Gift.getAll(req.db);
            res.send(lists);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends back all the gifts from a given list in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findGiftsFromList(req, res, next) {
        try {
            const listItems = await Gift.getFromList(req.db, req.params.listId);
            res.send(listItems);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends back in the response the gift with the giftId id.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findOne(req, res, next) {
        try {
            const list = await Gift.getOne(req.db, req.params.giftId);
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Creates a new gift and sends back its database representation in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
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

    /**
     * Updates a gift and sends it back in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
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

    /**
     * Toggles the favorite property of the given gift and sends back its new state in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async favoritize(req, res, next) {
        try {
            const newState = req.body.newState;
            const newFavState = await Gift.updateFavoriteState(
                req.db,
                req.params.giftId,
                newState
            );
            res.send(newFavState);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Deletes a gift and sends back true if it succeeds.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async delete(req, res, next) {
        try {
            await Gift.delete(req.db, req.params.giftId);
            res.send(true);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GiftController;
