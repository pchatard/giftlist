import { ManagementClient } from "auth0";
import {
	Body,
	Controller,
	Delete,
	Get,
	Hidden,
	Path,
	Post,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";

import { CreateUserDTO, UserDTO, UserIdDTO } from "../dto/users";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";
import { ValidateErrorJSON } from "../errors/ValidationError";
import User from "../models/User";
import UserService from "../services/UserService";
import { email } from "../types/email";
import { SelectKindList } from "../types/SelectKindList";
import { ListController } from "./ListController";

@Route("users")
@Tags("User")
export class UserManagementController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UserIdDTO>} id of the created user
	 */
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Post()
	async create(@Body() body: CreateUserDTO): Promise<UserIdDTO> {
		try {
			const { id }: User = await UserService.getById(body.id);
			return { id } as UserIdDTO;
		} catch (err: unknown) {
			const { id }: User = await UserService.create(body);
			return { id } as UserIdDTO;
		}
	}

	/**
	 * Delete logged user.
	 * @param {UUID} userId the ID of user
	 */
	@Security("auth0")
	@SuccessResponse(204)
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Delete("admin/{userId}")
	@Hidden() // TODO: Remove Hidden and add administration capabilities
	async delete(@Path() userId: string): Promise<void> {
		this.quickDelete(userId);
	}

	async quickDelete(userId: string): Promise<void> {
		const listController: ListController = new ListController();
		for (const list of await UserService.getUserLists(userId, SelectKindList.ALL)) {
			await listController.deleteById(list.id, userId);
		}
		await UserService.delete(userId);
		const management = new ManagementClient({
			domain: process.env.AUTH0_DOMAIN || "",
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			scope: "delete:users",
		});
		try {
			await management.deleteUser({ id: userId });
		} catch (e: unknown) {
			throw new ResourceNotFoundError();
		}
	}

	/**
	 * Gets all user's data.
	 * @returns {Promise<UserDTO[]>} all users
	 */
	@Security("auth0")
	@SuccessResponse(200, "Success response")
	@Get()
	async getAll(): Promise<UserDTO[]> {
		const users: User[] = await UserService.getAll();
		return users.map((user) => {
			const { id, friends, lists, friendLists, createdDate, ...rest } = user;
			return { ...rest } as UserDTO;
		});
	}

	/**
	 * Gets user's data.
	 * @param {email} userMail the email of user
	 * @returns {Promise<UserDTO>} the required user
	 */
	@Security("auth0")
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Get("profiles/{userMail}")
	async get(@Path() userMail: email): Promise<UserDTO> {
		const user: User = await UserService.getByMail(userMail);
		const { id, createdDate, ...rest } = user;
		return rest;
	}
}
