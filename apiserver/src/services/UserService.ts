import { UUID } from "../types/UUID";
import User from "./../models/User";
import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";
import List from "../models/List";
import { SelectKindList } from './../types/SelectKindList';

class UserService {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {string} email user mail
	 * @param {string} displayName user name to display
	 * @returns {Promise<User>} the created user
	 */
	static async create(email: string, displayName: string): Promise<User> {
		const userRepository: Repository<User> = getRepository(User);
		const user: User = userRepository.create({ email, displayName });
		return await userRepository.save(user);
	}

	/**
	 * Edit user properties.
	 * @param {UUID} userId id of user to update, uuid v4 formatted
	 * @param {Partial<User>} userNewProps new props of user to apply
	 * @returns {Promise<UpdateResult>}
	 */
	static async edit(userId: UUID, userNewProps: Partial<User>): Promise<UpdateResult> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.update(userId, { ...userNewProps });
	}

	/**
	 * Delete a user from Database.
	 * @param {UUID} userId id of user to delete, uuid v4 formatted
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(userId: UUID): Promise<DeleteResult> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.delete(userId);
	}

	/**
	 * Return all users from Database.
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getAll(): Promise<User[]> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.find();
	}

	/**
	 * Return a user from Database.
	 * @param {string} userId id of user to get, uuid v4 formatted
	 * @returns {Promise<User | undefined >} The user matching the userId parameter
	 */
	static async get(userId: UUID): Promise<User | undefined> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.findOne(userId);
	}

	/**
	 * 
	 * @param {UUID} userId 
	 * @param {} select 
	 */
	static async getUserLists(userId: UUID, select: SelectKindList): Promise<List[]> {
		const userRepository: Repository<User> = getRepository(User);
		const user: User | undefined = await userRepository.findOne(userId);
		let res: List[] = [];
		switch (select) {
			case SelectKindList.OWNED:
				res = user?.lists || [];
				break;
			case SelectKindList.GRANTED:
				res = user?.friendLists || [];
				break;
			case SelectKindList.ALL:
			default:
				res = (user?.lists || []).concat(user?.friendLists || [])
				break;
		}
		return res;
	}
}

export default UserService;
