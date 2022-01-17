import List from "./../models/List";
import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";
import { cleanObject } from "./../helpers/cleanObjects";
import { UUID } from "./../types/UUID";

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
	 * @param {UUID} listId id of user which ask, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(listId: UUID): Promise<DeleteResult> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.delete(listId);
	}

	/**
	 * Forget a list for a user from Database.
	 * @param {UUID} listId id of list to delete, uuid v4 formatted
	 * @param {UUID} listId id of user which ask, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async forget(listId: UUID, userId: UUID): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId);
		list.owners = list.owners.filter((owner) => owner.id !== userId);
		return await listRepository.save(list);
	}

	/**
	 * Return a list from Database.
	 * @param {string} listId id of list to get, uuid v4 formatted
	 * @returns {Promise<List>} The list matching the listId parameter
	 */
	static async get(listId: UUID): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.findOneOrFail(listId, { relations: ["owners"] });
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode sharing code of list to get, uuid v4 formatted
	 * @returns {Promise<List>} The list matching the listId parameter
	 */
	static async getFromSharingCode(sharingCode: UUID): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.findOneOrFail({
			where: { sharingCode: sharingCode },
			relations: ["owners"],
		});
	}

	/**
	 * List the list owners
	 * @param {UUID} listId id of list, uuid v4 formatted
	 * @returns
	 */
	static async listOwners(listId: UUID): Promise<UUID[]> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, { relations: ["owners"] });
		return list.owners.map((u) => u.id);
	}

	/**
	 * List the list granted users
	 * @param {UUID} listId id of list, uuid v4 formatted
	 * @returns
	 */
	static async listGrantedUsers(listId: UUID): Promise<UUID[]> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, {
			relations: ["grantedUsers"],
		});
		return list.grantedUsers?.map((u) => u.id) || [];
	}
}

export default ListService;
