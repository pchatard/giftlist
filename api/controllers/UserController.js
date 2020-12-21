const User = require('../services/UserService');

class UserController {
    /**
     * Gets logged in user's information
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     * @returns {Object} - User object
     */
    static async me(req, res, next) {
        try {
            const userId = req.userId;
            const user = await User.getOne(req.db, userId);
            res.send({ user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
