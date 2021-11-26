import { Request, Response } from "express";
import { Get, Route } from "tsoa";
import UserService from "../services/UserService";

@Route("test")
class UserController {
	/**
	 * Gets logged in user's information
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Object} - User object
	 */
	static async me(req: Request, res: Response): Promise<void> {
		const userId = req.user["https://giftlist-api/email"]
		const user = await UserService.getOne(req.app.get("database"), userId);
		if (user) {
			res.status(200).send({ user });
		} else {
			throw Error("User not logged-in");
		}
	}

	@Get("/")
	static test(): UserDTO {
		const user = null;
		if (!user) {
			return { displayName: "test" };
		}
		return user as UserDTO;
	}
}
export interface UserDTO {
	displayName: string;
}

export default UserController;
