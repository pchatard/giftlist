import { Database, DatabaseReference, onValue, push, ref, remove } from "@firebase/database";

class AuthService {
    /**
     * Adds the user object in the database.
     * Sends back its database representation.
     * @function
     * @param {Database} db - Database connection
     * @param {Object} user - User object
     * @returns {Object} User's database representation
     */
    static async create(db: Database, user) {
        const reference: DatabaseReference = ref(db, 'users');
        push(reference, user);
        return await this.getOne(db, user.firebase_uid);
    }

    /**
     * Returns a user from the database based on its firebase id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} firebaseId The firebase id of the searched user
     * @returns {Object} User's database representation.
     */
    static async getOne(db: Database, firebaseId) {
        const user = (await this.getAll(db)).find(
            (user) => user.firebase_uid === firebaseId
        );
        return user;
    }

    /**
     * Returns all the users from the database.
     * @param {Database} db - Database connection
     * @returns {Array} An array of all the users in the database.
     */
    static async getAll(db: Database) {
        const reference: DatabaseReference = ref(db, 'users');
        const results = onValue(reference, snap => {snap.val()}, { onlyOnce: true });
        const resultsArr: any = Object.keys(results).map((key) => {
            return { ...resultsArr[key], id: key };
        });
        return resultsArr;
    }

    /**
     * Removes a user from the database based on its id.
     * @param {Database} db - Database connection
     * @param {String} userId - User's database id to delete.
     */
    static delete(db: Database, userId) {
        const reference: DatabaseReference = ref(db, 'users/' + userId);
        remove(reference);
    }
}

export default AuthService;
