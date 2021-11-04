import { User } from "@firebase/auth";
import { Database, DatabaseReference, ref } from "@firebase/database";
import { get, query } from "firebase/database";
import UserDoesNotExistsError from "../errors/AuthErrors/UserDoesNotExistsError";

class UserService {
	/**
	 * Returns a given user from the database.
	 * @param {Database} db - Database connection
	 * @param {String} userId - User's database id
	 * @returns {Object} The user matching the userId parameter.
	 */
	static async getOne(db: Database, userId: string): Promise<User> {
		const reference: DatabaseReference = ref(db, `users/${userId}`);
		let user: User | null = (await get(query(reference))).val();
		if (!user) {
			throw new UserDoesNotExistsError();
		}
		return user;
	}
}

export default UserService;
