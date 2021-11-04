import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase/auth";
import { Get, Route } from 'tsoa';
//import { User } from '@firebase/auth';
import UserService from '../services/UserService';

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
	static async me(req: Request, res: Response, _next: NextFunction): Promise<void> {
		const user = await UserService.getOne(req.database, req.uid || "");
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
