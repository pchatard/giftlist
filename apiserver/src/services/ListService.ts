import Gift from './GiftService';
import { Database, DatabaseReference, onValue, push, ref, remove, set, update } from '@firebase/database';

class ListService {
    /**
     * Returns all the lists of the database.
     * @function
     * @param {Database} db - Database connection
     * @returns {Array} An array of gifts
     */
    static async getAll(db: Database) {
        const reference: DatabaseReference = ref(db, 'lists');
        const results: any = onValue(reference, snap => {snap.val()}, { onlyOnce: true });
        let resultsArr;
        if (results) {
            resultsArr = Object.keys(results).map((key) => {
                const id = key;
                const sharedWith = results[key].sharedWith
                    ? Object.values(results[key].sharedWith)
                    : [];
                return { ...results[key], sharedWith, id };
            });
        } else {
            resultsArr = [];
        }
        return resultsArr;
    }

    /**
     * Returns all the lists owned by and shared with the user with the userId id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} userId - The id of the user you want to get the lists
     * @returns {Object} An object containing an array of the owned lists and an array of the shared lists
     */
    static async getMine(db: Database, userId) {
        const lists = await this.getAll(db);
        const mine = lists.filter((list) => list.ownerId === userId);
        const shared = lists.filter(
            (list) => list.sharedWith.includes(userId) && list.public
        );
        return { mine, shared };
    }

    /**
     * Returns a list based on its id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list
     * @returns {Object} The list matching the listId id.
     */
    static async getOne(db: Database, listId) {
        const reference: DatabaseReference = ref(db, 'lists/' + listId);
        const result: any = onValue(reference, snap => {snap.val()}, { onlyOnce: true });
        if (result) {
            result.id = listId;
            const sharedWith = result.sharedWith
                ? Object.values(result.sharedWith)
                : [];
            result.sharedWith = sharedWith;

            return result;
        }
        return [];
    }

    /**
     * Creates a list in the database and returns its representation
     * @function
     * @param {Database} db - Database connection
     * @param {Object} list - The list object you want to add to the database
     * @returns {Object} The list's representation in the database.
     */
    static async create(db: Database, list) {
        const reference: DatabaseReference = ref(db, 'lists');
        const newList = push(reference, list);
        return await ListService.getOne(db, newList.key);
    }

    /**
     * Updates the name of a list based on its id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} id - The id of the list to be updated
     * @param {String} newName - The new name of the list
     * @returns {Object} The updated list
     */
    static async update(db: Database, id, newName) {
        const reference: DatabaseReference = ref(db, `lists/${id}`);
        update(reference, {
            '/name': newName,
            '/modified_at': Date(),
        });
        return await ListService.getOne(db, id);
    }

    /**
     * Removes a list from the database
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list to be deleted
     */
    static async delete(db: Database, listId) {
        await ListService.deleteGiftsFromList(db, listId);
        const reference: DatabaseReference = ref(db, 'lists/' + listId);
        remove(reference);
    }

    /**
     * Removes all the gifts from a given list
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list being deleted
     */
    static async deleteGiftsFromList(db: Database, listId) {
        const gifts = await Gift.getFromList(db, listId);
        gifts.forEach((gift) => {
            Gift.delete(db, gift.id, true);
        });
    }

    /**
     * Turns a list public property to true and Sets a sharingCode property to the code parameter in a given list
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list
     * @param {String} code - The sharingCode
     * @returns {Object} The updated list
     */
    static async share(db: Database, listId, code) {
        const reference: DatabaseReference = ref(db, `lists/${listId}/sharingCode`);
        set(reference, code);
        update(ref(db, `/lists/${listId}`), { '/public': true });
        return await ListService.getOne(db, listId);
    }

    /**
     * Returns a list based on its sharing code
     * @function
     * @param {Database} db - Database connection
     * @param {String} sharingCode - The sharing code of the list
     * @returns {Object} The list matching with the code.
     */
    static async getSharedList(db: Database, sharingCode) {
        const lists = await ListService.getAll(db);
        const sharedList = lists.find(
            (list) => list.sharingCode === sharingCode
        );
        return sharedList;
    }

    /**
     * Adds the user with userId id to the listId list's sharedWith property
     * @function
     * @param {Database} db - Database connection
     * @param {String} userId - The id of the user to be added
     * @param {String} listId - The id of the list where the user should be added
     */
    static addUserToList(db: Database, userId, listId) {
        const reference: DatabaseReference = ref(db, `lists/${listId}/sharedWith`);
        push(reference, userId);
    }

    /**
     * Turns public property to false of a given list.
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list that should go private
     * @returns {Object} The updated list.
     */
    static async private(db: Database, listId) {
        const reference: DatabaseReference = ref(db, `lists/${listId}/public`);
        set(reference, false);
        return await ListService.getOne(db, listId);
    }
}

export default ListService;
