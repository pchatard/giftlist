import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase/auth";

class UserController {
	/**
	 * Gets logged in user's information
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {NextFunction} next - Following middleware
	 * @returns {Object} - User object
	 */
	static me(_req: Request, res: Response, _next: NextFunction): void {
		const user = getAuth().currentUser;
		if (user) {
			res.status(200).send({ user });
		} else {
			throw Error("User not logged-in");
		}
	}
}

export default UserController;
