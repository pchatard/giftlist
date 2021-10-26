import { Database, onValue, push, ref, remove, set, update } from '@firebase/database';
import { DatabaseReference } from '@firebase/database';

class GiftService {
    /**
     * Returns all the gifts.
     * @function
     * @param {Database} db - Database connection
     * @returns {Array} An array of gifts
     */
    static async getAll(db: Database) {
        const reference: DatabaseReference = ref(db, 'gifts');
        const gifts: any = onValue(reference, snap => {snap.val()}, { onlyOnce: true });
        let formattedGifts;
        if (gifts) {
            formattedGifts = Object.keys(gifts).map((key) => {
                return { ...gifts[key], id: key };
            });
        } else {
            formattedGifts = [];
        }
        return formattedGifts;
    }

    /**
     * Returns all the gifts from a particular list.
     * @function
     * @param {Database} db - Database connection
     * @param {String} listId - The id of the list you want the gifts from
     * @returns {Array} An array of gifts from a same list.
     */
    static async getFromList(db: Database, listId) {
        const gifts = await this.getAll(db);
        const myGifts = gifts.filter((gift) => gift.listId === listId);
        return myGifts;
    }

    /**
     * Returns a gift based on its id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} giftId - The id of the gift you're looking for.
     * @returns {Object} Gift matching the giftId parameter.
     */
    static async getOne(db: Database, giftId) {
        const reference: DatabaseReference = ref(db, 'gifts/' + giftId);
        const gift: any = onValue(reference, snap => {snap.val()}, { onlyOnce: true });
        if (gift) {
            gift.id = giftId;
            return gift;
        }
        return [];
    }

    /**
     * Creates a gift in the database and returns its representation.
     * @function
     * @param {Database} db - Database connection
     * @param {Object} gift - The gift you want to create.
     * @returns {Object} The created gift's representation in the database.
     */
    static async create(db: Database, gift) {
        const reference: DatabaseReference = ref(db, 'gifts');
        const newGift = push(reference, gift);
        await GiftService.updateListModificationDate(db, newGift.key);
        return await this.getOne(db, newGift.key);
    }

    /**
     * Updates and returns a given gift.
     * @function
     * @param {Database} db - Database connection
     * @param {String} id - The id of the gift you want to update.
     * @param {Object} gift - The updated version of the gift.
     * @returns {Object} The updated gift's database represenation.
     */
    static async update(db: Database, id, gift) {
        const reference: DatabaseReference = ref(db, `gifts/${id}`);
        set(reference, gift);
        await GiftService.updateListModificationDate(db, id);
        return await this.getOne(db, id);
    }

    /**
     * Sets the favorite property of a given gift to the newState value.
     * @function
     * @param {Database} db - Database connection
     * @param {String} giftId - The id of the gift you want to toggle the favorite state.
     * @param {Boolean} newState - The new state of the favorite property of the gift.
     * @returns {Boolean} The new value of the Favorite property of that gift.
     */
    static async updateFavoriteState(db: Database, giftId, newState) {
        const reference: DatabaseReference = ref(db, `gifts/${giftId}`);
        update(reference, { [`/favorite`]: Boolean(newState) });

        await GiftService.updateListModificationDate(db, giftId);

        return newState;
    }

    /**
     * Sets the booked property of a given gift to the booked value.
     * @function
     * @param {Database} db - Database connection
     * @param {String} giftId - The id of the gift you want to toggle the booked state.
     * @param {*} booked - The new booked property of the gift.
     * @returns {Object} The updated gift.
     */
    static async updateBookedState(db: Database, giftId, booked) {
        const reference: DatabaseReference = ref(db, `gifts/${giftId}`);
        update(reference, { '/booked': booked });
        const updatedGift = await GiftService.getOne(db, giftId);
        return updatedGift;
    }

    /**
     * Removes a gift from the database based on its id.
     * @function
     * @param {Database} db - Database connection
     * @param {String} giftId - The id of the gift you want to delete.
     * @param {Boolean} deletedByList - The fact that this gift is deleted by deleting a complete list or not.
     */
    static async delete(db: Database, giftId, deletedByList = false) {
        const reference: DatabaseReference = ref(db, 'gifts/' + giftId);
        if (!deletedByList) {
            await GiftService.updateListModificationDate(db, giftId);
        }
        remove(reference);
    }

    /**
     * Updates a list's modified_at property after an operation on one of its gifts have been made.
     * @function
     * @param {Database} db - Database connection
     * @param {String} giftId - The id of the gift that was created / deleted / modified.
     */
    static async updateListModificationDate(db: Database, giftId) {
        const gift = await GiftService.getOne(db, giftId);
        const reference: DatabaseReference = ref(db, `lists/${gift.listId}`);
        update(reference, { '/modified_at': Date() });
    }
}

export default GiftService;
