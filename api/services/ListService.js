const Gift = require('./GiftService');
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

    static async delete(db, listId) {
        await ListService.deleteGiftsFromList(db, listId);
        const ref = db.ref('lists/' + listId);
        ref.remove();
    }

    static async deleteGiftsFromList(db, listId) {
        const gifts = await Gift.getFromList(db, listId);
        gifts.forEach((gift) => {
            Gift.delete(db, gift.id, true);
        });
    }

    static async share(db, listId, code) {
        const ref = db.ref(`lists/${listId}/sharingCode`);
        ref.set(code);
        return await ListService.getOne(db, listId);
    }

    static async getSharedList(db, sharingCode) {
        const lists = await ListService.getAll(db);
        const sharedList = lists.find(
            (list) => list.sharingCode === sharingCode
        );
        return sharedList;
    }
}

module.exports = ListService;
