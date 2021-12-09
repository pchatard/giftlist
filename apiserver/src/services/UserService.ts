import { User } from "./../models/User";
import { getRepository, Repository } from "typeorm";

import { User as FUser } from "@firebase/auth";
import { Database, DatabaseReference, ref } from "@firebase/database";
import { get, query } from "firebase/database";
import APIError from "../errors/APIError";

class UserService {
	/**
	 * Create a new user during sign up. Even if users are managed by Auth0,
	 * we manage a user database to store preferences, friends and much more.
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
	 * Returns a given user from the database.
	 * @param {Database} db - Database connection
	 * @param {String} userId - User's database id
	 * @returns {Object} The user matching the userId parameter.
	 */
	static async getOne(db: Database, userId: string): Promise<FUser> {
		const reference: DatabaseReference = ref(db, `users/${userId}`);
		let user: FUser | null = (await get(query(reference))).val();
		if (!user) {
			throw new APIError("UnknownUser", "This user doesn't exist on database");
		}
		return user;
	}
}

export default UserService;
