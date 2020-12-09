class ListService {
    static async getAll(db) {
        const ref = db.ref('lists');
        const results = (await ref.once('value')).val();
        const resultsArr = Object.keys(results).map((key) => {
            return { ...results[key], id: key };
        });
        return resultsArr;
    }

    static async getOne(db, listId) {
        const ref = db.ref('lists/' + listId);
        const result = (await ref.once('value')).val();
        result.id = listId;
        return result;
    }

    static async create(db, list) {
        const ref = db.ref('lists');
        const newList = ref.push(list);
        return await this.getOne(db, newList.key);
    }

    static delete(db, listId) {
        const ref = db.ref('lists/' + listId);
        ref.remove();
    }
}

module.exports = ListService;
