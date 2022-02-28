import {
	Body, Controller, Delete, Get, Hidden, Path, Post, Put, Response, Route, Security,
	SuccessResponse, Tags
} from "tsoa";
import { EntityNotFoundError } from "typeorm";

import { CreateUserDTO, UserDTO, UserIdDTO } from "../dto/users";
import MailAlreadyUsedError from "../errors/UserErrors/MailAlreadyUsedError";
import User from "../models/User";
import UserService from "../services/UserService";
import { email } from "../types/email";
import { SelectKindList } from "../types/SelectKindList";
import { ListController } from "./ListController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
export class UserManagementController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UUID>} UUID of the created user
	 */
	@SuccessResponse(200)
	@Response<MailAlreadyUsedError>(400, "If mail is already used")
	@Post()
	async create(@Body() body: CreateUserDTO): Promise<UserIdDTO> {
		try {
			const { id }: User = await UserService.getById(body.id);
			return { id } as UserIdDTO;
		} catch (err: any) {
			if (err instanceof EntityNotFoundError) {
				const { id }: User = await UserService.create(body);
				return { id } as UserIdDTO;
			}
			throw err;
		}
	}

	/**
	 * Edit a user.
	 * @param {UUID} userId the GUID of user
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(204)
	@Put("admin/{userId}")
	@Hidden() // TODO: Remove Hidden and add administration capabilities
	async edit(@Path() userId: string, @Body() body: Partial<UserDTO>): Promise<void> {
		await UserService.edit(userId, body);
	}

	/**
	 * Delete logged user.
	 * @param {UUID} userId the GUID of user
	 */
	@SuccessResponse(204)
	@Delete("admin/{userId}")
	@Hidden() // TODO: Remove Hidden and add administration capabilities
	async delete(@Path() userId: string): Promise<void> {
		const listController: ListController = new ListController();
		for (const list of await UserService.getUserLists(userId, SelectKindList.ALL)) {
			await listController.delete(list.id, userId);
		}
		await UserService.delete(userId);
	}

	/**
	 * Gets all user's data.
	 * @returns {Promise<UserDTO[]>} all users
	 */
	@SuccessResponse(200)
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
	@SuccessResponse(200)
	@Get("{userMail}")
	async get(@Path() userMail: email): Promise<UserDTO> {
		const user: User = await UserService.getByMail(userMail);
		const { id, createdDate, ...rest } = user;
		return rest;
	}
}
