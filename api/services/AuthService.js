class AuthService {
    /**
     * Adds the user object in the database.
     * Sends back its database representation.
     * @function
     * @param {Object} db - Database connection
     * @param {Object} user - User object
     * @returns {Object} User's database representation
     */
    static async create(db, user) {
        const ref = db.ref('users');
        ref.push(user);
        return await this.getOne(db, user.firebase_uid);
    }

    /**
     * Returns a user from the database based on its firebase id.
     * @function
     * @param {Object} db - Database connection
     * @param {String} firebaseId The firebase id of the searched user
     * @returns {Object} User's database representation.
     */
    static async getOne(db, firebaseId) {
        const user = (await this.getAll(db)).find(
            (user) => user.firebase_uid === firebaseId
        );
        return user;
    }

    /**
     * Returns all the users from the database.
     * @param {Object} db - Database connection
     * @returns {Array} An array of all the users in the database.
     */
    static async getAll(db) {
        const ref = db.ref('users');
        const results = (await ref.once('value')).val();
        const resultsArr = Object.keys(results).map((key) => {
            return { ...results[key], id: key };
        });
        return resultsArr;
    }

    /**
     * Removes a user from the database based on its id.
     * @param {Object} db - Database connection
     * @param {String} userId - User's database id to delete.
     */
    static delete(db, userId) {
        const ref = db.ref('users/' + userId);
        ref.remove();
    }
}

module.exports = AuthService;
