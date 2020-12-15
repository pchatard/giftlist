import List from '../services/ListService';

const authorize = async (req, res, next) => {
    try {
        // get the listId
        const listId = req.params.listId;

        // Get the owner id
        const ownerId = (await List.getOne(req.db, listId)).ownerId;

        // Compare user ids
        if (ownerId === req.userId) {
            next();
        } else {
            throw new Error('Not authorized');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { authorize };
