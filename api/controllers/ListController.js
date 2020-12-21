const { v4: uuidv4 } = require('uuid');
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

    static async findSharedList(req, res, next) {
        try {
            const sharingCode = req.params.sharingCode;
            const sharedList = await List.getSharedList(req.db, sharingCode);
            res.send(sharedList);
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

    static async update(req, res, next) {
        try {
            const updatedList = await List.update(
                req.db,
                req.params.listId,
                req.body.name
            );
            res.send(updatedList);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await List.delete(req.db, req.params.listId);
            await ListController.findMine(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    static async share(req, res, next) {
        try {
            // Get the list ID.
            const listId = req.params.listId;
            const currentList = await List.getOne(req.db, listId);
            if (currentList.sharingCode) {
                res.send({ list: currentList });
            } else {
                // Generate a random link and a link
                const code = uuidv4();
                // Add them to the list in DB
                const list = await List.share(req.db, listId, code);
                // Return
                res.send({ list });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ListController;
