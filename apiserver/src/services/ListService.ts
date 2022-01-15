import List from "../models/List";
import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";
import { cleanObject } from "../helpers/cleanObjects";
import { UUID } from "../types/UUID";

class ListService {
	/**
	 * Create a new list.
	 * @returns {Promise<List>} the created list
	 */
	static async create(listInfos: Partial<List>): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = listRepository.create(cleanObject(listInfos));
		return await listRepository.save(list);
	}

	/**
	 * Edit list properties.
	 * @param {UUID} listId id of list to update, uuid v4 formatted
	 * @param {Partial<List>} listNewProps new props of list to apply
	 * @returns {Promise<UpdateResult>}
	 */
	static async edit(listId: UUID, listNewProps: Partial<List>): Promise<UpdateResult> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.update(listId, { ...listNewProps });
	}

	/**
	 * Delete a list from Database.
	 * @param {UUID} listId id of list to delete, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(listId: UUID): Promise<DeleteResult> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.delete(listId);
	}

	/**
	 * Return a list from Database.
	 * @param {string} listId id of list to get, uuid v4 formatted
	 * @returns {Promise<List | undefined >} The list matching the listId parameter
	 */
	static async get(listId: UUID): Promise<List | undefined> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.findOne(listId);
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode sharing code of list to get, uuid v4 formatted
	 * @returns {Promise<List | undefined >} The list matching the listId parameter
	 */
	static async getFromSharingCode(sharingCode: UUID): Promise<List | undefined> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.findOne({ where: { sharingCode: sharingCode } });
	}

	/**
	 * Check if the list is owned by the user
	 * @param {UUID} listId id of list to check, uuid v4 formatted
	 * @param {UUID} userId id of owner, uuid v4 formatted
	 * @returns
	 */
	static async checkOwnership(listId: UUID, userId: UUID): Promise<boolean> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List | undefined = await listRepository.findOne(listId);
		return list?.owners.map((u) => u.id == userId).includes(true) || false;
	}
}

export default ListService;
