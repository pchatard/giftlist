import { Request as ERequest } from "express";
import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Query,
	Request,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";

import { CreateListDTO, EditListDTO, ListDTO, ListIdDTO } from "../dto/lists";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";
import UnauthorizedError, { UnauthorizedErrorJSON } from "../errors/UnauthorizedError";
import { ValidateErrorJSON } from "../errors/ValidationError";
import { castListAsListDTO } from "../helpers/lists";
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
	 * Please note that user which call the function is added to owners if not anticipated in body call
	 * @param {CreateListDTO} body list property for entity creation
	 */
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Post()
	async create(@Request() request: ERequest, @Body() body: CreateListDTO): Promise<ListIdDTO> {
		const owners: User[] = await UserService.getMany([...body.ownersIds, request.userId]);
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner")
	@Put("{listId}")
	async edit(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Body() body: Partial<EditListDTO>
	): Promise<void> {
		if (!(await ListService.listOwners(listId)).includes(request.userId)) {
			throw new UnauthorizedError();
		}
		await ListService.edit(listId, body);
	}

	/**
	 * Delete a list.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner or granted")
	@Delete("{listId}")
	async delete(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		await this.deleteById(listId, request.userId);
	}

	/**
	 * Delete a list by id
	 * @param listId id of list to delete
	 * @param userId owner or granted user of the list
	 */
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
			throw new UnauthorizedError();
		}
	}

	/**
	 * Gets all user's lists data.
	 * @param {SelectKindList} select flag to select owned or granted lists
	 * @returns {Promise<ListDTO[]>} all user lists
	 */
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Get()
	async getAll(@Request() request: ERequest, @Query() select: SelectKindList): Promise<ListDTO[]> {
		const lists: List[] = await UserService.getUserLists(request.userId, select);
		return lists.map((list) => castListAsListDTO(list, false));
	}

	/**
	 * Sends back a list in the response based on its id.
	 * @param {UUID} listId the GUID of the list
	 * @returns {Promise<ListDTO>} the list
	 */
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner or granted")
	@Get("{listId}")
	async get(@Request() request: ERequest, @Path() listId: UUID): Promise<ListDTO> {
		if (
			!(await ListService.listOwners(listId)).includes(request.userId) &&
			!(await ListService.listGrantedUsers(listId)).includes(request.userId)
		) {
			throw new UnauthorizedError();
		}
		return castListAsListDTO(await ListService.get(listId));
	}

	/**
	 * Make a list to public.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner")
	@Put("{listId}/share")
	async share(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		await this.edit(request, listId, { isShared: true });
	}

	/**
	 * Make a list private.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner")
	@Put("{listId}/unshare")
	async private(@Request() request: ERequest, @Path() listId: UUID): Promise<void> {
		await this.edit(request, listId, { isShared: false });
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode the sharing code of the list
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Put("invite/{sharingCode}")
	async accessFromCode(@Request() request: ERequest, @Path() sharingCode: UUID): Promise<void> {
		try {
			const list: List = await ListService.getFromSharingCode(sharingCode);
			const user: User = await UserService.getById(request.userId);
			if (!list.owners.find((u) => u.id == user.id)) {
				await ListService.addGrantedUser(list.id, user);
			}
		} catch (err: unknown) {
			throw new ResourceNotFoundError();
		}
	}
}
