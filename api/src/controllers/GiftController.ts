import { Request as ERequest } from "express";
import {
	Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags
} from "tsoa";

import { CreateGiftDTO, GiftDTO, GiftIdDTO } from "../dto/gifts";
import OwnershipError from "../errors/UserErrors/OwnershipError";
import { cleanObject } from "../helpers/cleanObjects";
import Gift from "../models/Gift";
import List from "../models/List";
import GiftService from "../services/GiftService";
import ListService from "../services/ListService";
import { UUID } from "../types/UUID";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("lists/{listId}/gifts")
@Tags("Gift")
export class GiftController extends Controller {
	/**
	 * Creates a new gift.
	 * @param {UUID} listId gift list id
	 * @param {CreateGiftDTO} body list property for entity creation
	 * @returns {Promise<GiftIdDTO>} gift id
	 */
	@SuccessResponse(200)
	@Post()
	async create(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Body() body: CreateGiftDTO
	): Promise<GiftIdDTO> {
		if (!(await ListService.listOwners(listId)).includes(request.userId)) {
			throw new OwnershipError();
		}
		const list: List = await ListService.get(listId);
		const { id }: Gift = await GiftService.create({ ...body, list });
		return { id } as GiftIdDTO;
	}

	/**
	 * Edit a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 * @param {ListDTO} body data to edit a gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}")
	async edit(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID,
		@Body() body: Partial<GiftDTO>
	): Promise<void> {
		if (
			!(await ListService.listOwners(listId)).includes(request.userId) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		await GiftService.edit(giftId, body);
	}

	/**
	 * Delete a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Delete("{giftId}")
	async delete(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		if (
			!(await ListService.listOwners(listId)).includes(request.userId) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		this.quickDelete(giftId);
	}

	async quickDelete(giftId: UUID): Promise<void> {
		await GiftService.delete(giftId);
	}

	/**
	 * Gets all list's gifts data.
	 * @param {UUID} listId gifts list id
	 * @returns {Promise<ListDTO[]>} all list gifts
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(@Request() request: ERequest, @Path() listId: UUID): Promise<GiftDTO[]> {
		let gifts: Gift[] = [];
		if ((await ListService.listGrantedUsers(listId)).includes(request.userId)) {
			gifts = await ListService.getListGifts(listId, false);
		} else if ((await ListService.listOwners(listId)).includes(request.userId)) {
			gifts = await ListService.getListGifts(listId, true);
		} else {
			throw new OwnershipError();
		}
		return gifts.map((gift) => {
			const { id, list, createdDate, updatedDate, ...rest } = gift;
			return cleanObject(rest) as GiftDTO;
		});
	}

	/**
	 * Sends back a gift in the response based on its id.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(200)
	@Get("{giftId}")
	async get(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<GiftDTO> {
		if (
			(!(await ListService.listOwners(listId)).includes(request.userId) &&
				!(await ListService.listGrantedUsers(listId)).includes(request.userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		const { id, list, createdDate, updatedDate, ...rest }: Gift = await GiftService.get(giftId);
		return cleanObject(rest) as GiftDTO;
	}

	/**
	 * Mark a gift as hidden.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/hide")
	async hide(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		await this.edit(request, listId, giftId, { isHidden: true });
	}

	/**
	 * Remove "hidden" flag of a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unhide")
	async unhide(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		await this.edit(request, listId, giftId, { isHidden: false });
	}

	/**
	 * Mark a gift as favorite.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/fav")
	async favorite(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		await this.edit(request, listId, giftId, { isFavorite: true });
	}

	/**
	 * Remove "favorite" flag of a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unfav")
	async unfavorite(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		await this.edit(request, listId, giftId, { isFavorite: false });
	}

	/**
	 * Mark a gift as booked.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/book")
	async book(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		if (
			(!(await ListService.listOwners(listId)).includes(request.userId) &&
				!(await ListService.listGrantedUsers(listId)).includes(request.userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		await GiftService.edit(giftId, { isBooked: true });
	}

	/**
	 * Remove "booked" flag of a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unbook")
	async unbook(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		if (
			(!(await ListService.listOwners(listId)).includes(request.userId) &&
				!(await ListService.listGrantedUsers(listId)).includes(request.userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		await GiftService.edit(giftId, { isBooked: false });
	}
}

export default GiftController;
