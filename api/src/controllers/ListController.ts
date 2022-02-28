import { Request as ERequest } from "express";
import jwt from "jsonwebtoken";
import {
	Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, SuccessResponse,
	Tags
} from "tsoa";

import { CreateListDTO, ListDTO, ListIdDTO } from "../dto/lists";
import OwnershipError from "../errors/UserErrors/OwnershipError";
import { cleanObject } from "../helpers/cleanObjects";
import List from "../models/List";
import User from "../models/User";
import ListService from "../services/ListService";
import UserService from "../services/UserService";
import { SelectKindList } from "../types/SelectKindList";
import { UUID } from "../types/UUID";
import GiftController from "./GiftController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("lists")
@Tags("List")
export class ListController extends Controller {
	/**
	 * Creates a new list.
	 */
	@SuccessResponse(200)
	@Post()
	async create(@Body() body: CreateListDTO): Promise<ListIdDTO> {
		const owners: User[] = await UserService.getMany(body.ownersIds);
		let grantedUsers: User[] = [];
		if (body.grantedUsersIds) {
			grantedUsers = await UserService.getMany(body.grantedUsersIds);
		}
		const { id }: List = await ListService.create({ ...body, owners, grantedUsers });
		return { id } as ListIdDTO;
	}

	/**
	 * Edit a list.
	 * @param {UUID} listId the GUID of the list
	 * @param {ListDTO} body data to edit a list
	 */
	@SuccessResponse(204)
	@Put("{listId}")
	async edit(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Body() body: Partial<ListDTO>
	): Promise<void> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const auth0UserId: string = jwt.decode(token, { json: true })?.sub || "";
		if (!(await ListService.listOwners(listId)).includes(auth0UserId)) {
			throw new OwnershipError();
		}
		await ListService.edit(listId, body);
	}

	/**
	 * Delete a list.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Delete("{listId}")
	async delete(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const auth0UserId: string = jwt.decode(token, { json: true })?.sub || "";
		await this.deleteById(listId, auth0UserId);
	}

	async deleteById(listId: UUID, userId: string): Promise<void> {
		const ownerIds: string[] = await ListService.listOwners(listId);
		const grantedIds: string[] = await ListService.listGrantedUsers(listId);
		if (ownerIds.includes(userId) || grantedIds.includes(userId)) {
			await ListService.forget(listId, userId);
			if (ownerIds.length == 1 && ownerIds.includes(userId)) {
				for (const grantedId of grantedIds) {
					await ListService.forget(listId, grantedId);
				}
				const giftController: GiftController = new GiftController();
				for (const gift of await ListService.getListGifts(listId, true)) {
					await giftController.quickDelete(gift.id);
				}
				await ListService.delete(listId);
			}
		} else {
			throw new OwnershipError();
		}
	}

	/**
	 * Gets all user's lists data.
	 * @returns {Promise<ListDTO[]>} all user lists
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(@Request() request: ERequest, @Query() select: SelectKindList): Promise<ListDTO[]> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const auth0UserId: string = jwt.decode(token, { json: true })?.sub || "";
		const lists: List[] = await UserService.getUserLists(auth0UserId, select);
		return lists.map((list) => {
			const { id, grantedUsers, grantedUsersIds, owners, createdDate, updatedDate, ...rest } =
				list;
			rest.sharingCode = rest.isShared ? rest.sharingCode : "";
			return cleanObject(rest) as ListDTO;
		});
	}

	/**
	 * Sends back a list in the response based on its id.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(200)
	@Get("{listId}")
	async get(@Request() request: ERequest, @Path() listId: UUID): Promise<ListDTO> {
		// TODO: MEEEEEEEEEEERGE THIS CODE IN MIDDL ?
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const auth0UserId: string = jwt.decode(token, { json: true })?.sub || "";
		if (
			!(await ListService.listOwners(listId)).includes(auth0UserId) &&
			!(await ListService.listGrantedUsers(listId)).includes(auth0UserId)
		) {
			throw new OwnershipError();
		}
		const { id, grantedUsers, owners, createdDate, updatedDate, ...rest }: List =
			await ListService.get(listId);
		rest.sharingCode = rest.isShared ? rest.sharingCode : "";
		return cleanObject(rest) as ListDTO;
	}

	/**
	 * Make a list to public.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/share")
	async share(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		await this.edit(request, listId, { isShared: true });
	}

	/**
	 * Make a list private.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/unshare")
	async private(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		await this.edit(request, listId, { isShared: false });
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode the sharing code of the list
	 */
	@SuccessResponse(204)
	@Put("invite/{sharingCode}")
	async accessFromSharingCode(
		@Request() request: ERequest,
		@Path() sharingCode: UUID
	): Promise<void> {
		const token: string = (request.headers["authorization"] || "").split("Bearer ")[1];
		const auth0UserId: string = jwt.decode(token, { json: true })?.sub || "";
		const list: List = await ListService.getFromSharingCode(sharingCode);
		const user: User = await UserService.getById(auth0UserId);
		if (!list.owners.find((u) => u.id == user.id)) {
			await ListService.addGrantedUser(list.id, user);
		}
	}
}
