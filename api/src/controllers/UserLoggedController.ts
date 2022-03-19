import { Request as ERequest } from "express";
import {
	Body,
	Controller,
	Delete,
	Get,
	Put,
	Request,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";

import { UserDTO } from "../dto/users";
import { ValidateErrorJSON } from "../errors/ValidationError";
import User from "../models/User";
import UserService from "../services/UserService";
import { UserManagementController } from "./UserManagementController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users/me")
@Tags("User")
export class UserLoggedController extends Controller {
	/**
	 * Gets logged user's data.
	 * @returns {Promise<UserDTO>} the required user
	 */
	@SuccessResponse(200, "Success response")
	@Get()
	async get(@Request() request: ERequest): Promise<UserDTO> {
		const user: User = await UserService.getByAuth0Id(request.userId);
		const { id, createdDate, ...rest } = user;
		return rest;
	}

	/**
	 * Edit a user.
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Put()
	async edit(@Request() request: ERequest, @Body() body: Partial<UserDTO>): Promise<void> {
		await UserService.edit(request.userId, body);
	}

	/**
	 * Delete logged user.
	 */
	@SuccessResponse(204)
	@Delete()
	async delete(@Request() request: ERequest): Promise<void> {
		const umc: UserManagementController = new UserManagementController();
		await umc.quickDelete(request.userId);
	}
}
