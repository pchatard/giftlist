import Auth from "../services/AuthService";
import { verifyPassword } from "../middlewares/authenticate";
import { signToken } from "../helpers/Token/JWTokenProducer";
import PasswordRequirementsError from "../errors/AuthErrors/PasswordRequirementsError";
import UserAlreadyExistsError from "../errors/AuthErrors/UserAlreadyExistsError";
import InvalidCredentialsError from "../errors/AuthErrors/InvalidCredentialsError";
import { Request as ERequest, Response } from "express";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DatabaseUser from "../types/DatabaseUser"
import { Post, Route } from "tsoa";

@Route("auth")
class AuthController {
	/**
	 * Registers a new user
	 * @function
	 * @param {ERequest} req - Express request object
	 * @returns {void} - Returns nothing.
	 */
	@Post("/")
	static async register(req: ERequest, res: Response): Promise<void> {
		const { email, password } = req.body;
		const auth = req.app.get("auth")
		// Regex password verification
		if (!verifyPassword(password)) {
			throw new PasswordRequirementsError();
		}
		try {
			// Firebase user creation
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			await signOut(auth);
			// Create user for DB
			const { password: nope, passwordConfirmation: nope2, ...databaseUser } = req.body;
			databaseUser.firebase_uid = user.uid;
			Auth.create(req.app.get("database"), databaseUser as DatabaseUser);
			res.status(200).json()
		} catch (error) {
			//res.status(500).json({name:"Test", message: "test"})
			throw new UserAlreadyExistsError();
		}
	}

	/**
	 * Logs a new user in
	 * @function
	 * @param {ERequest} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 * @returns {Object} - Returns an object with the public token.
	 */
	static async login(req: ERequest, res: Response, next: Function): Promise<void> {
		try {
			const { email, password } = req.body;
			const auth = req.app.get("auth")

			try {
				// Firebase signIn check
				const { user } = await signInWithEmailAndPassword(auth, email, password);

				// Retrive user from database
				const { id } = await Auth.getOne(req.app.get("database"), user.uid);

				// Sign tokens and set cookies
				const token = signToken(id);

				// Send back public token and user object
				res.send({ token });
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
	 * @param {ERequest} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async signout(req: ERequest, res: Response, next: Function) {
		const auth = req.app.get("auth")
		try {
			// Sign Out from Firebase
			await signOut(auth);

			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
