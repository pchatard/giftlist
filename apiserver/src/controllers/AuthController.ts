import Auth from "../services/AuthService";
import { verifyPassword } from "../middlewares/authenticate";
import { signToken } from "../helpers/Token/JWTokenProducer";
import PasswordRequirementsError from "../errors/AuthErrors/PasswordRequirementsError";
import UserAlreadyExistsError from "../errors/AuthErrors/UserAlreadyExistsError";
import InvalidCredentialsError from "../errors/AuthErrors/InvalidCredentialsError";
import { Request, Response } from "express";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
				const { user } = await createUserWithEmailAndPassword(req.authent, email, password);
				await signOut(req.authent);

				// Create user for DB
				const { password: nope, passwordConfirmation: nope2, ...databaseUser } = req.body;
				databaseUser.firebase_uid = user.uid;

				const { uid } = Auth.create(req.database, databaseUser as DatabaseUser);

				res.send({ uid });
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
				const { user } = await signInWithEmailAndPassword(req.authent, email, password);

				// Retrive user from database
				const { id } = await Auth.getOne(req.database, user.uid);

				// Sign tokens and set cookies
				const token = signToken(id);

				// Send back public token and user object
				res.send({ token: token });
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
	static async signout(req: Request, res: Response, next: Function) {
		try {
			// Sign Out from Firebase
			await signOut(req.authent);

			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
