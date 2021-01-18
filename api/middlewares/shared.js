const List = require('../services/ListService');
const SharedListAccessError = require('../errors/ListErrors/SharedListAccessError');
const UnvalidSharingCodeError = require('../errors/ListErrors/UnvalidSharingCodeError');

const preventOwner = async (req, res, next) => {
    try {
        const response = await List.getSharedList(
            req.db,
            req.params.sharingCode
        );
        if (response) {
            const { ownerId } = response;
            const userId = req.userId;
            if (ownerId === userId) {
                throw new SharedListAccessError();
            }
            next();
        } else {
            throw new UnvalidSharingCodeError();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { preventOwner };
