const state = () => ({
    mine: [],
});

const actions = {
    async initialize({ commit }) {
        const lists = await this.$axios.$get('/lists/mine', {
            withCredentials: true,
        });
        commit('POPULATE_LISTS', lists);
    },
    async createList({ commit }, name) {
        const createdList = await this.$axios.$post(
            '/lists',
            { name },
            { withCredentials: true }
        );
        commit('NEW_LIST', createdList);
    },
    async deleteList({ commit }, listId) {
        const newLists = await this.$axios.$delete(`/lists/${listId}`, {
            withCredentials: true,
        });
        commit('REMOVE_LIST', newLists);
    },
};
const mutations = {
    POPULATE_LISTS: (state, lists) => {
        state.mine = lists;
    },
    NEW_LIST: (state, list) => {
        state.mine.push(list);
    },
    REMOVE_LIST: (state, newLists) => {
        state.mine = newLists;
    },
};

export default { state, actions, mutations };
