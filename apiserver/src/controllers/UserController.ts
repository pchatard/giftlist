import express from "express";
import {
	Body,
	Controller,
	Put,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "@tsoa/runtime";
import UserService from "../services/UserService";
import User from "../models/User";
import MailAlreadyUsedError from "../errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "../errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "../errors/FieldIsMissingError";

type CreateUserDTO = Omit<User, "id" | "friends">;
type UserDTO = Omit<User, "id" | "friends">;

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
	@SuccessResponse(200)
	@Response<Error>(400)
	@Put("/")
	static async create(@Body() body: CreateUserDTO): Promise<UserDTO> {
		if (!body.email || !body.displayName) {
			throw new FieldIsMissingError(!body.email ? "email" : "displayName");
		}
		if (!EMAIL_REGEX.test(body.email)) {
			throw new MailIsInvalidError();
		}
		try {
			const { id, friends, ...userDTO }: User = await UserService.create(
				body.email,
				body.displayName
			);
			return userDTO as UserDTO;
		} catch (err: any) {
			if ((err.code = "23505" && /^Key \(email\)=\('.*'\) already exists\./.test(err.detail))) {
				throw new MailAlreadyUsedError();
			}
			throw err;
		}
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
