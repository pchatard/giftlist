const { v4: uuidv4 } = require('uuid');
const List = require('../services/ListService');
const User = require('../services/UserService');

const { checkListNameAvailabilty } = require('../helpers/lists');

const ListNameAlreadyUsedError = require('../errors/ListErrors/ListNameAlreadyUsedError');

class ListController {
    /**
     * Sends back in the response all the lists.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findAll(req, res, next) {
        try {
            const lists = await List.getAll(req.db);
            res.send(lists);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends back in the response the lists owned by and shared with the logged in user.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findMine(req, res, next) {
        try {
            const { mine, shared } = await List.getMine(req.db, req.userId);
            res.send({ mine, shared });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends back a list in the response based on its id.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findOne(req, res, next) {
        try {
            const list = await List.getOne(req.db, req.params.listId);
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Creates a new list and sends its database representation back in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async create(req, res, next) {
        try {
            const { firstName, lastName } = await User.getOne(
                req.db,
                req.userId
            );

            if (
                !(await checkListNameAvailabilty(
                    req.db,
                    req.userId,
                    req.body.name
                ))
            ) {
                throw new ListNameAlreadyUsedError();
            }

            const list = {
                name: req.body.name,
                created_at: Date(),
                modified_at: Date(),
                ownerId: req.userId,
                owner: `${firstName} ${lastName}`,
                public: false,
            };
            const createdList = await List.create(req.db, list);
            res.send(createdList);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Updates a list and sends it back in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async update(req, res, next) {
        try {
            if (
                !(await checkListNameAvailabilty(
                    req.db,
                    req.userId,
                    req.body.name
                ))
            ) {
                throw new ListNameAlreadyUsedError();
            }

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

    /**
     * Deletes a list and sends back the user's lists in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async delete(req, res, next) {
        try {
            await List.delete(req.db, req.params.listId);
            await ListController.findMine(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Creates a sharing code for a list to make it public.
     * Sends back the list in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async share(req, res, next) {
        try {
            // Get the list ID.
            const listId = req.params.listId;
            const currentList = await List.getOne(req.db, listId);
            let code = currentList.sharingCode;
            if (!code) {
                code = uuidv4();
            }
            // Add them to the list in DB
            const list = await List.share(req.db, listId, code);
            // Return
            res.send({ list });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Makes a list private.
     * Sends back the list in the response.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async private(req, res, next) {
        try {
            const listId = req.params.listId;
            const privateList = await List.private(req.db, listId);
            res.send({ list: privateList });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends back a list in the response based on its sharing code.
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static async findSharedList(req, res, next) {
        try {
            // Retrieve the list from the sharing code
            const sharedList = await List.getSharedList(
                req.db,
                req.params.sharingCode
            );

            // Add the user to the list's sharedWith property if not already done
            if (!sharedList.sharedWith.includes(req.userId)) {
                List.addUserToList(req.db, req.userId, sharedList.id);
            }

            res.send(sharedList);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ListController;
