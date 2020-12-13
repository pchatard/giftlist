const state = () => ({
    items: [],
});

const actions = {
    // ITEMS
    async initialize({ commit }, listId) {
        const items = await this.$axios.$get(`/items/${listId}`, {
            withCredentials: true,
        });
        commit('POPULATE_ITEMS', items);
    },
    async addItemToList({ commit }, item) {
        // API CALL RETURNING UPDATED LIST
        const newItem = await this.$axios.$post(
            `/items`,
            {
                item,
            },
            { withCredentials: true }
        );
        commit('ADD_ITEM', newItem);
    },
    async favoritizeItem({ commit }, payload) {
        const { itemId, newState } = payload;
        const newFavoriteState = await this.$axios.$put(
            `/items/${itemId}/fav`,
            { newState },
            { withCredentials: true }
        );
        commit('MARK_ITEM_FAVORITE', { itemId, newState: newFavoriteState });
    },
    async deleteItem({ commit }, itemId) {
        const success = await this.$axios.$delete(`/items/${itemId}`, {
            withCredentials: true,
        });
        if (success) {
            commit('DELETE_ITEM', itemId);
        }
    },
};

const mutations = {
    POPULATE_ITEMS: (state, items) => (state.items = items),
    ADD_ITEM: (state, item) => {
        state.items.push(item);
    },
    MARK_ITEM_FAVORITE: (state, payload) => {
        const { itemId, newState } = payload;
        const itemIndex = state.items.findIndex((item) => item.id === itemId);
        if (itemIndex >= 0) {
            state.items[itemIndex].favorite = newState;
        }
    },
    DELETE_ITEM: (state, itemId) => {
        const itemIndex = state.items.findIndex((item) => item.id === itemId);
        if (itemIndex >= 0) {
            state.items.splice(itemIndex, 1);
        }
    },
};

module.exports = { state, actions, mutations };
