class ItemService {
    static async getAll(db) {
        const ref = db.ref('items');
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
        const ref = db.ref('items/' + itemId);
        const item = (await ref.once('value')).val();
        if (item) {
            item.id = itemId;
            return item;
        }
        return [];
    }

    static async create(db, item) {
        const ref = db.ref('items');
        const newItem = ref.push(item);
        return await this.getOne(db, newItem.key);
    }

    static delete(db, itemId) {
        const ref = db.ref('items/' + itemId);
        ref.remove();
    }
}

module.exports = ItemService;
