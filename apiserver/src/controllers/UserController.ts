import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase/auth";
import { Get, Route } from 'tsoa';
//import { User } from '@firebase/auth';

@Route("test")
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

	@Get("/")
	static test(): UserDTO {
		const user = getAuth().currentUser;
		if (!user) {
			throw Error("User not logged-in");
		}
		return user as UserDTO;
	}


}
export interface UserDTO {
	displayName: string
}

export default UserController;
