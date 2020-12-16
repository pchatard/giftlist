class ListService {
    static async getAll(db) {
        const ref = db.ref('lists');
        const results = (await ref.once('value')).val();
        let resultsArr;
        if (results) {
            resultsArr = Object.keys(results).map((key) => {
                return { ...results[key], id: key };
            });
        } else {
            resultsArr = [];
        }
        return resultsArr;
    }

    static async getMine(db, userId) {
        const lists = await this.getAll(db);
        const myLists = lists.filter((list) => list.ownerId === userId);
        return myLists;
        // return lists;
    }

    static async getOne(db, listId) {
        const ref = db.ref('lists/' + listId);
        const result = (await ref.once('value')).val();
        if (result) {
            result.id = listId;
            return result;
        }
        return [];
    }

    static async create(db, list) {
        const ref = db.ref('lists');
        const newList = ref.push(list);
        return await ListService.getOne(db, newList.key);
    }

    static async update(db, id, newName) {
        const ref = db.ref(`lists/${id}`);
        ref.update({
            '/name': newName,
            '/modified_at': Date(),
        });
        return await ListService.getOne(db, id);
    }

    static delete(db, listId) {
        const ref = db.ref('lists/' + listId);
        ref.remove();
    }
}

module.exports = ListService;
