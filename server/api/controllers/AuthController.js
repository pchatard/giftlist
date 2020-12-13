const Auth = require('../services/AuthService');
const { verifyPassword } = require('../middlewares/authenticate');
const { signTokens } = require('../helpers/jwt');
const { setCookies, clearCookies } = require('../helpers/cookies');

class AuthController {
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
            const databaseUser = {
                email: user.email,
                firebase_uid: user.uid,
            };
            const dbUser = await Auth.create(req.db, databaseUser);

            // Sign tokens and set cookies
            const tokens = signTokens(dbUser.id);
            setCookies(res, tokens);

            // Send back public token
            res.send({
                token: tokens.publicToken,
                user: dbUser,
            });
        } catch (error) {
            next(error);
        }
    }

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
            const dbUser = await Auth.getOne(req.db, user.uid);

            // Sign tokens and set cookies
            const tokens = signTokens(dbUser.id);
            setCookies(res, tokens);

            // Send back public token and user object
            res.send({
                token: tokens.publicToken,
                user: dbUser,
            });
        } catch (error) {
            next(error);
        }
    }

    static signout(req, res, next) {
        try {
            // Clear cookiess
            clearCookies(res);
            // Send back something
            res.send('signout called');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
