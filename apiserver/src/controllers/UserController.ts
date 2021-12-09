import express from "express";
import { Route } from "tsoa";
import { Body, Controller, Put, Security, Tags } from "@tsoa/runtime";
import UserService from "../services/UserService";
import User from "../models/User";

type CreateUserDTO = Pick<User, "email" | "displayName">;
type UserDTO = Pick<User, "email" | "displayName">;

@Security("bearerAuth") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
class UserController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UserDTO>} the created user
	 */
	@Put("/")
	static async create(@Body() body: CreateUserDTO): Promise<UserDTO> {
		//req.user["https://giftlist-api/email"];
		const { id, friends, ...userDTO }: User = await UserService.create(
			body.email,
			body.displayName
		);
		return userDTO as UserDTO;
	}

	/**
	 * Gets logged in user's information
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Object} - User object
	 */
	static async me(req: express.Request, res: express.Response): Promise<void> {
		const userId = req.user["https://giftlist-api/email"];
		const user = await UserService.getOne(req.app.get("database"), userId);
		if (user) {
			res.status(200).send({ user });
		} else {
			throw Error("User not logged-in");
		}
	}
}

export default UserController;
