const List = require('../services/ListService');

class ListController {
    static async findAll(req, res, next) {
        try {
            const lists = await List.getAll(req.db);
            res.send(lists);
        } catch (error) {
            next(error);
        }
    }

    static async findMine(req, res, next) {
        try {
            const myLists = await List.getMine(req.db, req.userId);
            res.send(myLists);
        } catch (error) {
            next(error);
        }
    }

    static async findOne(req, res, next) {
        try {
            const list = await List.getOne(req.db, req.params.listId);
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const list = {
                name: req.body.name,
                created_at: Date(),
                modified_at: Date(),
                ownerId: req.userId,
            };
            const createdList = await List.create(req.db, list);
            res.send(createdList);
        } catch (error) {
            next(error);
        }
    }

    static delete(req, res, next) {
        try {
            List.delete(req.db, req.params.listId);
            res.send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ListController;
