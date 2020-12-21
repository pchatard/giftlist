class GiftService {
    static async getAll(db) {
        const ref = db.ref('gifts');
        const gifts = (await ref.once('value')).val();
        let formatedGifts;
        if (gifts) {
            formatedGifts = Object.keys(gifts).map((key) => {
                return { ...gifts[key], id: key };
            });
        } else {
            formatedGifts = [];
        }
        return formatedGifts;
    }

    static async getFromList(db, listId) {
        const gifts = await this.getAll(db);
        const myGifts = gifts.filter((gift) => gift.listId === listId);
        return myGifts;
    }

    static async getOne(db, giftId) {
        const ref = db.ref('gifts/' + giftId);
        const gift = (await ref.once('value')).val();
        if (gift) {
            gift.id = giftId;
            return gift;
        }
        return [];
    }

    static async create(db, gift) {
        const ref = db.ref('gifts');
        const newGift = ref.push(gift);
        await GiftService.updateListModificationDate(db, newGift.key);
        return await this.getOne(db, newGift.key);
    }

    static async update(db, id, gift) {
        const ref = db.ref(`gifts/${id}`);
        ref.set(gift);
        await GiftService.updateListModificationDate(db, id);
        return await this.getOne(db, id);
    }

    static async updateFavoriteState(db, giftId, newState) {
        const ref = db.ref(`gifts/${giftId}`);
        ref.update({
            [`/favorite`]: Boolean(newState),
        });

        await GiftService.updateListModificationDate(db, giftId);

        return newState;
    }

    static async delete(db, giftId, fromList = false) {
        const ref = db.ref('gifts/' + giftId);
        if (!fromList) {
            await GiftService.updateListModificationDate(db, giftId);
        }
        ref.remove();
    }

    static async updateListModificationDate(db, giftId) {
        const gift = await GiftService.getOne(db, giftId);
        const refList = db.ref(`lists/${gift.listId}`);
        refList.update({
            '/modified_at': Date(),
        });
    }
}

module.exports = GiftService;
