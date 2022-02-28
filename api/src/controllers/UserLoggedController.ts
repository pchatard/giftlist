import { Request as ERequest } from "express";
import jwt from "jsonwebtoken";
import {
	Body, Controller, Delete, Get, Put, Request, Route, Security, SuccessResponse, Tags
} from "tsoa";

import { UserDTO } from "../dto/users";
import User from "../models/User";
import UserService from "../services/UserService";
import { SelectKindList } from "../types/SelectKindList";
import { ListController } from "./ListController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users/me")
@Tags("User")
export class UserLoggedController extends Controller {
	/**
	 * Gets logged user's data.
	 * @returns {Promise<UserDTO>} the required user
	 */
	@SuccessResponse(200)
	@Get()
	async get(@Request() request: ERequest): Promise<UserDTO> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";

		const user: User = await UserService.getById(decodedToken);
		const { id, createdDate, ...rest } = user;
		return rest;
	}

	/**
	 * Edit a user.
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(204)
	@Put()
	async edit(@Request() request: ERequest, @Body() body: Partial<UserDTO>): Promise<void> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";
		await UserService.edit(decodedToken, body);
	}

	/**
	 * Delete logged user.
	 */
	@SuccessResponse(204)
	@Delete()
	async delete(@Request() request: ERequest): Promise<void> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const decodedToken: string = jwt.decode(token, { json: true })?.sub || "";
		const listController: ListController = new ListController();
		for (const list of await UserService.getUserLists(decodedToken, SelectKindList.ALL)) {
			await listController.delete(list.id, decodedToken);
		}
		await UserService.delete(decodedToken);
	}
}
