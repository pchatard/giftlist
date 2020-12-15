const state = () => ({
    gifts: [],
});

const actions = {
    async initialize({ commit, state }, listId) {
        const gifts = await this.$axios.$get(`/api/gifts/${listId}`, {
            withCredentials: true,
        });
        commit('POPULATE_GIFTS', gifts);
        return state.gifts;
    },
    async addGiftToList({ commit }, gift) {
        const newGift = await this.$axios.$post(
            `/api/gifts/${gift.listId}`,
            {
                gift,
            },
            { withCredentials: true }
        );
        commit('ADD_GIFT', newGift);
    },
    async favoritizeGift({ commit }, { giftId, listId, newState }) {
        const newFavoriteState = await this.$axios.$put(
            `/api/gifts/${listId}/${giftId}/fav`,
            { newState },
            { withCredentials: true }
        );
        commit('MARK_GIFT_FAVORITE', { giftId, newState: newFavoriteState });
    },
    async deleteGift({ commit }, { giftId, listId }) {
        const success = await this.$axios.$delete(
            `/api/gifts/${listId}/${giftId}`,
            {
                withCredentials: true,
            }
        );
        if (success) {
            commit('DELETE_GIFT', giftId);
        }
    },
};

const mutations = {
    POPULATE_GIFTS: (state, gifts) => {
        state.gifts = gifts;
    },
    ADD_GIFT: (state, gift) => {
        state.gifts.push(gift);
    },
    MARK_GIFT_FAVORITE: (state, payload) => {
        const { giftId, newState } = payload;
        const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
        if (giftIndex >= 0) {
            state.gifts[giftIndex].favorite = newState;
        }
    },
    DELETE_GIFT: (state, giftId) => {
        const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
        if (giftIndex >= 0) {
            state.gifts.splice(giftIndex, 1);
        }
    },
};

module.exports = { state, actions, mutations };
