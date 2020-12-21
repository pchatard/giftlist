const Auth = require('../services/AuthService');
const { verifyPassword } = require('../middlewares/authenticate');
const { signTokens } = require('../helpers/jwt');
const { setCookies, clearCookies } = require('../helpers/cookies');

class AuthController {
    /**
     * Registers a new user
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     * @returns {String} - Returns the new user's ID.
     */
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;

            // Regex password verification
            if (!verifyPassword(password)) throw new Error('unvalid password');

            // Firebase user creation
            const { user } = await req.auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await req.auth.signOut();

            // Create user for DB
            const {
                password: nope,
                passwordConfirmation: nope2,
                ...databaseUser
            } = req.body;
            databaseUser.firebase_uid = user.uid;

            const { id } = await Auth.create(req.db, databaseUser);

            res.send({
                id,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Logs a new user in
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     * @returns {Object} - Returns an object with the public token.
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Firebase signIn check
            const { user } = await req.auth.signInWithEmailAndPassword(
                email,
                password
            );
            await req.auth.signOut();

            // Retrive user from database
            const { id } = await Auth.getOne(req.db, user.uid);

            // Sign tokens and set cookies
            const tokens = signTokens(id);
            setCookies(res, tokens);

            // Send back public token and user object
            res.send({
                token: tokens.publicToken,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Logs a new user out
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     */
    static signout(req, res, next) {
        try {
            // Clear cookiess
            clearCookies(res);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
