import { Database, DatabaseReference, onValue, ref } from '@firebase/database';

class UserService {
    /**
     * Returns a given user from the database.
     * @param {Database} db - Database connection
     * @param {String} userId - User's database id
     * @returns {Object} The user matching the userId parameter.
     */
    static async getOne(db: Database, userId) {
        const reference: DatabaseReference = ref(db, `users/${userId}`);
        const user = { ...onValue(reference, snap => {snap.val()}, { onlyOnce: true }), id: userId };
        return user;
    }
}

export default UserService;
