import { Database, DatabaseReference, get, push, ref, remove } from "@firebase/database";
import { User } from "@firebase/auth";
import { query } from "firebase/database";
import DatabaseUser from '../types/DatabaseUser';

class AuthService {
	/**
	 * Adds the user object in the database.
	 * Sends back its database representation.
	 * @function
	 * @param {Database} db - Database connection
	 * @param {DatabaseUser} user - User object
	 * @returns {User} User's database representation
	 */
	static create(db: Database, user: DatabaseUser): User {
		const reference: DatabaseReference = ref(db, "users");
		push(reference, user);
		const { firebase_uid, ...res } = user;
		return res as User;
	}

	/**
	 * Returns a user from the database based on its firebase id.
	 * @function
	 * @param {Database} db - Database connection
	 * @param {String} firebaseId The firebase id of the searched user
	 * @returns {Object} User's database representation.
	 */
	static async getOne(db: Database, firebaseId: string): Promise<any> {
		return (await this.getAll(db)).find((user) => user.firebase_uid === firebaseId);
	}

	/**
	 * Returns all the users from the database.
	 * @param {Database} db - Database connection
	 * @returns {Array} An array of all the users in the database.
	 */
	static async getAll(db: Database): Promise<Array<any>> {
		const reference: DatabaseReference = ref(db, "/users");
		var results = new Array();
		(await get(query(reference))).forEach((u) => {
			results.push(u.val());
		});
		// TODO: Clean
		let resultsArr: any = results;
		resultsArr = Object.keys(results).map((key) => {
			return { ...resultsArr[key], id: key };
		});
		return resultsArr;
	}

	/**
	 * Removes a user from the database based on its id.
	 * @param {Database} db - Database connection
	 * @param {String} userId - User's database id to delete.
	 */
	static delete(db: Database, userId: string) {
		const reference: DatabaseReference = ref(db, "users/" + userId);
		remove(reference);
	}
}

export default AuthService;
