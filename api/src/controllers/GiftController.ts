import { Request as ERequest } from "express";
import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Request,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";

import { CreateGiftDTO, EditGiftDTO, GiftDTO, GiftDTOForOwner, GiftIdDTO } from "../dto/gifts";
import UnauthorizedError, { UnauthorizedErrorJSON } from "../errors/UnauthorizedError";
import { ValidateErrorJSON } from "../errors/ValidationError";
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
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner of list")
	@Post()
	async create(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Body() body: CreateGiftDTO
	): Promise<GiftIdDTO> {
		if (!(await ListService.listOwners(listId)).includes(request.userId)) {
			throw new UnauthorizedError();
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
	@Put("{giftId}")
	async edit(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID,
		@Body() body: Partial<EditGiftDTO>
	): Promise<void> {
		if (
			!(await ListService.listOwners(listId)).includes(request.userId) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new UnauthorizedError();
		}
		await GiftService.edit(giftId, body);
	}

	/**
	 * Delete a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
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
			throw new UnauthorizedError();
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
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(401, "If user not owner or granted of list")
	@Get()
	async getAll(
		@Request() request: ERequest,
		@Path() listId: UUID
	): Promise<GiftDTO[] | GiftDTOForOwner[]> {
		let gifts: Gift[] = [];
		const isOwner: boolean = (await ListService.listOwners(listId)).includes(request.userId);
		if ((await ListService.listGrantedUsers(listId)).includes(request.userId)) {
			gifts = await ListService.getListGifts(listId, false);
		} else if (isOwner) {
			gifts = await ListService.getListGifts(listId, true);
		} else {
			throw new UnauthorizedError();
		}
		return gifts.map((gift) => {
			const { list, createdDate, updatedDate, ...rest } = gift;
			return cleanObject(rest, [isOwner ? "isBooked" : ""]) as GiftDTO | GiftDTOForOwner;
		});
	}

	/**
	 * Sends back a gift in the response based on its id.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(200, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner or granted of list or gift does not belong to list"
	)
	@Get("{giftId}")
	async get(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<GiftDTO | GiftDTOForOwner> {
		const isOwner: boolean = (await ListService.listOwners(listId)).includes(request.userId);
		if (
			(!isOwner && !(await ListService.listGrantedUsers(listId)).includes(request.userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new UnauthorizedError();
		}
		const { list, createdDate, updatedDate, ...rest }: Gift = await GiftService.get(giftId);
		return cleanObject(rest, [isOwner ? "isBooked" : ""]) as GiftDTO | GiftDTOForOwner;
	}

	/**
	 * Mark a gift as hidden.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user not owner of list or gift does not belong to list"
	)
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
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user is owner or not granted of list or gift does not belong to list"
	)
	@Put("{giftId}/book")
	async book(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		if (
			((await ListService.listOwners(listId)).includes(request.userId) &&
				!(await ListService.listGrantedUsers(listId)).includes(request.userId)) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new UnauthorizedError();
		}
		await GiftService.edit(giftId, { isBooked: true });
	}

	/**
	 * Remove "booked" flag of a gift.
	 * @param {UUID} listId gift list id
	 * @param {UUID} giftId the GUID of the gift
	 */
	@SuccessResponse(204, "Success response")
	@Response<ValidateErrorJSON>(422, "If body or request param type is violated")
	@Response<UnauthorizedErrorJSON>(
		401,
		"If user is owner or granted of list or gift does not belong to list"
	)
	@Put("{giftId}/unbook")
	async unbook(
		@Request() request: ERequest,
		@Path() listId: UUID,
		@Path() giftId: UUID
	): Promise<void> {
		if (
			(await ListService.listOwners(listId)).includes(request.userId) ||
			!(await ListService.listGrantedUsers(listId)).includes(request.userId) ||
			!(await GiftService.checkGiftOfList(listId, giftId))
		) {
			throw new UnauthorizedError();
		}
		await GiftService.edit(giftId, { isBooked: false });
	}
}

export default GiftController;
