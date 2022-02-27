import { Request as ERequest } from "express";
import jwt from "jsonwebtoken";
import {
	Body, Controller, Delete, Get, Path, Post, Put, Request, Response, Route, Security,
	SuccessResponse, Tags
} from "tsoa";
import { EntityNotFoundError } from "typeorm";

import { CreateUserDTO, UserDTO, UserIdDTO } from "../dto/users";
import MailAlreadyUsedError from "../errors/UserErrors/MailAlreadyUsedError";
import OwnershipError from "../errors/UserErrors/OwnershipError";
import User from "../models/User";
import UserService from "../services/UserService";
import { email } from "../types/email";
import { SelectKindList } from "../types/SelectKindList";
import { ListController } from "./ListController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
export class UserController extends Controller {
	/**
	 * Gets logged user's data.
	 * @returns {Promise<UserDTO>} the required user
	 */
	@SuccessResponse(200)
	@Get("me")
	async getLogged(@Request() request: ERequest): Promise<UserDTO> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";
		try {
			const user: User = await UserService.getById(decodedToken);
			const { id, createdDate, ...rest } = user;
			return rest;
		} catch (err: any) {
			if (err instanceof EntityNotFoundError) {
				throw new OwnershipError();
			}
			throw err;
		}
	}

	/**
	 * Edit a user.
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(204)
	@Put("me")
	async edit(@Request() request: ERequest, @Body() body: Partial<UserDTO>): Promise<void> {
		try {
			const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
			const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";
			await UserService.edit(decodedToken, body);
		} catch (err: any) {
			if (err instanceof EntityNotFoundError) {
				throw new OwnershipError();
			}
			throw err;
		}
	}

	/**
	 * Delete logged user.
	 */
	@SuccessResponse(204)
	@Delete("me")
	async delete(@Request() request: ERequest): Promise<void> {
		try {
			const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
			const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";
			const listController: ListController = new ListController();
			for (const list of await UserService.getUserLists(decodedToken, SelectKindList.ALL)) {
				await listController.delete(list.id, decodedToken);
			}

			await UserService.delete(decodedToken);
		} catch (err: any) {
			if (err instanceof EntityNotFoundError) {
				throw new OwnershipError();
			}
			throw err;
		}
	}

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
