const User = require('../services/UserService');

class UserController {
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
