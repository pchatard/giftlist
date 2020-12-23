class UserService {
    /**
     * Returns a given user from the database.
     * @param {Object} db - Database connection
     * @param {String} userId - User's database id
     * @returns {Object} The user matching the userId parameter.
     */
    static async getOne(db, userId) {
        const ref = db.ref(`users/${userId}`);
        const user = { ...(await ref.once('value')).val(), id: userId };
        return user;
    }
}

module.exports = UserService;
