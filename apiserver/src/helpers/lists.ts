import List from "../services/ListService";
import { Database } from "@firebase/database";

/**
 * Checks if a list name is already used for a particular user
 * @function
 * @param {Database} db - Database connection
 * @param {string} userId - The user id
 * @param {string} listName- The list name to be checked against the list
 * @returns Boolean
 */
export function checkListNameAvailability(db: Database, userId: string, listName: string): boolean {
	const { mine } = List.getMine(db, userId) as { mine: Array<any> };
	const listNames = mine.map((list: { name: string }) => list.name.toLowerCase());
	return !listNames.includes(listName.toLowerCase());
}
