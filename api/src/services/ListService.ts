import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";

import Gift from "../models/Gift";
import List from "../models/List";
import { User } from "../models/User";
import { UUID } from "../types/UUID";

class ListService {
	/**
	 * Create a new list.
	 * @param {Partial<List>} listInfos partial list infos, required for creation of entity
	 * @returns {Promise<List>} the created list
	 */
	static async create(listInfos: Partial<List>): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = listRepository.create(listInfos);
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
	 * @param {UUID} userId id of user which ask, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(listId: UUID): Promise<DeleteResult> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.delete(listId);
	}

	/**
	 * Forget a list for a user from Database.
	 * @param {UUID} listId id of list to delete, uuid v4 formatted
	 * @param {UUID} userId id of user which ask, uuid v4 formatted
	 * @returns {Promise<List>} the forgotten list
	 */
	static async forget(listId: UUID, userAuth0Id: UUID): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, {
			relations: ["owners", "grantedUsers"],
		});
		list.owners = list.owners.filter((owner) => owner.auth0Id !== userAuth0Id);
		list.grantedUsers = (list.grantedUsers || []).filter((user) => user.auth0Id !== userAuth0Id);
		return await listRepository.save(list);
	}

	/**
	 * Return a list from Database.
	 * @param {string} listId id of list to get, uuid v4 formatted
	 * @returns {Promise<List>} The list matching the listId parameter
	 */
	static async get(listId: UUID): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		return await listRepository.findOneOrFail(listId, {
			relations: ["owners", "grantedUsers"],
		});
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
			relations: ["owners", "grantedUsers"],
		});
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode sharing code of list to get, uuid v4 formatted
	 * @param {User} user user to add to granted
	 * @returns {Promise<List>} The list matching the listId parameter
	 */
	static async addGrantedUser(listId: UUID, user: User): Promise<List> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, {
			relations: ["grantedUsers"],
		});
		list.isShared = true;
		list.grantedUsers = (list.grantedUsers || []).concat(user);
		return await listRepository.save(list);
	}

	/**
	 * List the list owners
	 * @param {UUID} listId id of list, uuid v4 formatted
	 * @returns {Promise<UUID[]>} the listId owners
	 */
	static async ownersAuth0Ids(listId: UUID): Promise<UUID[]> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, { relations: ["owners"] });
		return list.owners.map((u) => u.auth0Id);
	}

	/**
	 * List the list granted users
	 * @param {UUID} listId id of list, uuid v4 formatted
	 * @returns {Promise<UUID[]>} the listId granted users
	 */
	static async grantedUsersAuth0Ids(listId: UUID): Promise<UUID[]> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, {
			relations: ["grantedUsers"],
		});
		return (list.grantedUsers || []).map((u) => u.auth0Id);
	}

	/**
	 * Returns all list gifts.
	 * @param {UUID} listId id of list, uuid v4 formatted
	 * @param {boolean} showHidden flag to show hidden gifts or not
	 * @returns {Promise<Gift[]>} the listId gifts
	 */
	static async getListGifts(listId: UUID, showHidden: boolean): Promise<Gift[]> {
		const listRepository: Repository<List> = getRepository(List);
		const list: List = await listRepository.findOneOrFail(listId, {
			relations: ["gifts"],
		});
		return (list.gifts || [])
			.filter((g) => (showHidden ? true : g.isHidden == false))
			.sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf());
	}
}

export default ListService;
