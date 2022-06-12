import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";

import Gift from "../models/Gift";
import { UUID } from "../types/UUID";

class GiftService {
	/**
	 * Create a new gift.
	 * @param {Partial<Gift>} giftInfos partial gift infos, required for creation of entity
	 * @returns {Promise<Gift>} the created gift
	 */
	static async create(giftInfos: Partial<Gift>): Promise<Gift> {
		const giftRepository: Repository<Gift> = getRepository(Gift);
		const gift: Gift = giftRepository.create(giftInfos);
		return await giftRepository.save(gift);
	}

	/**
	 * Edit gift properties.
	 * @param {UUID} giftId id of gift to update, uuid v4 formatted
	 * @param {Partial<Gift>} giftNewProps new props of gift to apply
	 * @returns {Promise<UpdateResult>}
	 */
	static async edit(giftId: UUID, giftNewProps: Partial<Gift>): Promise<UpdateResult> {
		const giftRepository: Repository<Gift> = getRepository(Gift);
		return await giftRepository.update(giftId, { ...giftNewProps });
	}

	/**
	 * Delete a gift from Database.
	 * @param {UUID} giftId id of gift to delete, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(giftId: UUID): Promise<DeleteResult> {
		const giftRepository: Repository<Gift> = getRepository(Gift);
		return await giftRepository.delete(giftId);
	}

	/**
	 * Return a gift from Database.
	 * @param {UUID} giftId id of gift to get, uuid v4 formatted
	 * @returns {Promise<Gift>} The gift matching the giftId parameter
	 */
	static async get(giftId: UUID): Promise<Gift> {
		const giftRepository: Repository<Gift> = getRepository(Gift);
		return await giftRepository.findOneOrFail(giftId, { relations: ["bookedBy"] });
	}

	/**
	 * Check if gift belongs to list.
	 * @param {UUID} listId id of gift to get, uuid v4 formatted
	 * @param {UUID} giftId id of list to get, uuid v4 formatted
	 * @returns {Promise<boolean>} gift belongs to list
	 */
	static async checkGiftOfList(listId: UUID, giftId: UUID): Promise<boolean> {
		return (await this.get(giftId)).listId == listId;
	}
}

export default GiftService;
