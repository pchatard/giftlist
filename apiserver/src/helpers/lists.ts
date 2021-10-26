import List from '../services/ListService';

/**
 * Checks if a list name is already used for a particular user
 * @function
 * @param {db} - Database connection
 * @param {userId} - The user id
 * @param {listName} - The list name to be checked against the list
 * @returns Boolean
 */
export async function checkListNameAvailability(db, userId, listName) {
    const { mine } = await List.getMine(db, userId);
    const listNames = mine.map((list) => list.name.toLowerCase());
    return !listNames.includes(listName.toLowerCase());
}

