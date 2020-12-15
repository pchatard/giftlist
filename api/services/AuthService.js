class AuthService {
    static async create(db, user) {
        const ref = db.ref('users');
        ref.push(user);
        return await this.getOne(db, user.firebase_uid);
    }

    static async getOne(db, firebaseId) {
        const user = (await this.getAll(db)).find(
            (user) => user.firebase_uid === firebaseId
        );
        return user;
    }

    static async getAll(db) {
        const ref = db.ref('users');
        const results = (await ref.once('value')).val();
        const resultsArr = Object.keys(results).map((key) => {
            return { ...results[key], id: key };
        });
        return resultsArr;
    }

    static delete(db, userId) {
        const ref = db.ref('users/' + userId);
        ref.remove();
    }
}

module.exports = AuthService;
