import Auth from '../services/AuthService';
import { verifyPassword } from '../middlewares/authenticate';
import { signTokens } from '../helpers/jwt';
import { setCookies, clearCookies } from '../helpers/cookies';
import PasswordRequirementsError from '../errors/AuthErrors/PasswordRequirementsError';
import UserAlreadyExistsError from '../errors/AuthErrors/UserAlreadyExistsError';
import InvalidCredentialsError from '../errors/AuthErrors/InvalidCredentialsError';
import { Request, Response } from 'express';

class AuthController {
    /**
     * Registers a new user
     * @function
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Following middleware
     * @returns {String} - Returns the new user's ID.
     */
    static async register(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const { email, password } = req.body;

            // Regex password verification
            if (!verifyPassword(password)) {
                throw new PasswordRequirementsError();
            }

            try {
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
                throw new UserAlreadyExistsError();
            }
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
    static async login(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const { email, password } = req.body;

            try {
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
                throw new InvalidCredentialsError();
            }
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
    static signout(_: Request, res: Response, next: Function) {
        try {
            // Clear cookies
            clearCookies(res);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
