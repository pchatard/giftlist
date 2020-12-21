const List = require('../services/ListService');

const preventOwner = async (req, res, next) => {
    try {
        const { ownerId } = await List.getSharedList(
            req.db,
            req.params.sharingCode
        );
        const userId = req.userId;
        if (ownerId === userId) {
            throw new Error('Owner cannot access its own shared list');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { preventOwner };
