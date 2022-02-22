import {
	Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Security, SuccessResponse, Tags
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
	 */
	@SuccessResponse(200)
	@Post()
	async create(
		@Path() listId: UUID,
		@Body() body: CreateGiftDTO,
		@Query() userId: UUID
	): Promise<GiftIdDTO> {
		if (!(await ListService.listOwners(listId)).includes(userId)) {
			throw new OwnershipError();
		}
		const list: List = await ListService.get(listId);
		const { id }: Gift = await GiftService.create({ ...body, list });
		return { id } as GiftIdDTO;
	}

	/**
	 * Edit a gift.
	 * @param {UUID} giftId the GUID of the gift
	 * @param {ListDTO} body data to edit a gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}")
	async edit(
		@Path() listId: UUID,
		@Path() giftId: UUID,
		@Body() body: Partial<GiftDTO>,
		@Query() userId: UUID
	): Promise<void> {
		if (
			!(await ListService.listOwners(listId)).includes(userId) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		await GiftService.edit(giftId, body);
	}

	/**
	 * Delete a gift.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Delete("{giftId}")
	async delete(@Path() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<void> {
		if (
			!(await ListService.listOwners(listId)).includes(userId) ||
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
	 * @returns {Promise<ListDTO[]>} all list gifts
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(@Path() listId: UUID, @Query() userId: UUID): Promise<GiftDTO[]> {
		let gifts: Gift[] = [];
		if ((await ListService.listGrantedUsers(listId)).includes(userId)) {
			gifts = await ListService.getListGifts(listId, false);
		} else if ((await ListService.listOwners(listId)).includes(userId)) {
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
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(200)
	@Get("{giftId}")
	async get(@Path() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<GiftDTO> {
		if (
			(!(await ListService.listOwners(listId)).includes(userId) &&
				!(await ListService.listGrantedUsers(listId)).includes(userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new OwnershipError();
		}
		const { id, list, createdDate, updatedDate, ...rest }: Gift = await GiftService.get(giftId);
		return cleanObject(rest) as GiftDTO;
	}

	/**
	 * Mark a gift as hidden.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/hide")
	async hide(@Query() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<void> {
		await this.edit(listId, giftId, { isHidden: true }, userId);
	}

	/**
	 * Remove "hidden" flag of a gift.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unhide")
	async unhide(@Query() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<void> {
		await this.edit(listId, giftId, { isHidden: false }, userId);
	}

	/**
	 * Mark a gift as favorite.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/fav")
	async favorite(
		@Path() listId: UUID,
		@Path() giftId: UUID,
		@Query() userId: UUID
	): Promise<void> {
		await this.edit(listId, giftId, { isFavorite: true }, userId);
	}

	/**
	 * Remove "favorite" flag of a gift.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unfav")
	async unfavorite(
		@Path() listId: UUID,
		@Path() giftId: UUID,
		@Query() userId: UUID
	): Promise<void> {
		await this.edit(listId, giftId, { isFavorite: false }, userId);
	}

	/**
	 * Mark a gift as booked.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/book")
	async book(@Path() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<void> {
		await this.edit(listId, giftId, { isBooked: true }, userId);
	}

	/**
	 * Remove "booked" flag of a gift.
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204)
	@Put("{giftId}/unbook")
	async unbook(@Path() listId: UUID, @Path() giftId: UUID, @Query() userId: UUID): Promise<void> {
		await this.edit(listId, giftId, { isBooked: false }, userId);
	}
}

export default GiftController;
