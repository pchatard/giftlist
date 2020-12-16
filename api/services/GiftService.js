class GiftService {
    static async getAll(db) {
        const ref = db.ref('gifts');
        const items = (await ref.once('value')).val();
        let formatedItems;
        if (items) {
            formatedItems = Object.keys(items).map((key) => {
                return { ...items[key], id: key };
            });
        } else {
            formatedItems = [];
        }
        return formatedItems;
    }

    static async getItemsFromList(db, listId) {
        const items = await this.getAll(db);
        const myItems = items.filter((item) => item.listId === listId);
        return myItems;
    }

    static async getOne(db, itemId) {
        const ref = db.ref('gifts/' + itemId);
        const item = (await ref.once('value')).val();
        if (item) {
            item.id = itemId;
            return item;
        }
        return [];
    }

    static async create(db, item) {
        const ref = db.ref('gifts');
        const newItem = ref.push(item);
        await GiftService.updateListModificationDate(db, newItem.key);
        return await this.getOne(db, newItem.key);
    }

    static async update(db, id, gift) {
        const ref = db.ref(`gifts/${id}`);
        ref.set(gift);
        await GiftService.updateListModificationDate(db, id);
        return await this.getOne(db, id);
    }

    static async updateFavoriteState(db, itemId, newState) {
        const ref = db.ref(`gifts/${itemId}`);
        ref.update({
            [`/favorite`]: Boolean(newState),
        });

        await GiftService.updateListModificationDate(db, itemId);

        return newState;
    }

    static async delete(db, itemId) {
        const ref = db.ref('gifts/' + itemId);
        await GiftService.updateListModificationDate(db, itemId);
        ref.remove();
    }

    static async updateListModificationDate(db, itemId) {
        const gift = await GiftService.getOne(db, itemId);
        const refList = db.ref(`lists/${gift.listId}`);
        refList.update({
            '/modified_at': Date(),
        });
    }
}

module.exports = GiftService;
