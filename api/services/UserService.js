class UserService {
    static async getOne(db, userId) {
        const ref = db.ref(`users/${userId}`);
        const user = { ...(await ref.once('value')).val(), id: userId };
        return user;
    }
}

module.exports = UserService;
