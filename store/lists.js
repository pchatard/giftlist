const state = () => ({
    mine: [],
    shared: [],
});

const actions = {
    async initialize({ commit, state }) {
        const lists = await this.$axios.$get('/api/lists/mine', {
            withCredentials: true,
        });
        commit('POPULATE_LISTS', lists);
        return state;
    },
    async createList({ commit }, name) {
        const createdList = await this.$axios.$post(
            '/api/lists',
            { name },
            { withCredentials: true }
        );
        commit('NEW_LIST', createdList);
    },
    async shareList({ commit, state }, listId) {
        const { list: newList } = await this.$axios.$get(
            `/api/lists/${listId}/share`,
            {
                withCredentials: true,
            }
        );
        commit('UPDATE_LIST', newList);
        return state;
    },
    async updateList({ commit }, { name, id }) {
        const updatedList = await this.$axios.$put(
            `/api/lists/${id}`,
            {
                name,
            },
            { withCredentials: true }
        );
        commit('UPDATE_LIST', updatedList);
    },
    async deleteList({ commit, state }, listId) {
        const newLists = await this.$axios.$delete(`/api/lists/${listId}`, {
            withCredentials: true,
        });
        commit('REMOVE_LIST', newLists);
        return state;
    },
};
const mutations = {
    POPULATE_LISTS: (state, lists) => {
        state.mine = lists.mine;
        state.shared = lists.shared;
    },
    NEW_LIST: (state, list) => {
        state.mine.push(list);
    },
    UPDATE_LIST: (state, newList) => {
        const listIndex = state.mine.findIndex(
            (list) => list.id === newList.id
        );
        if (listIndex >= 0) {
            state.mine.splice(listIndex, 1, newList);
        }
    },
    REMOVE_LIST: (state, newLists) => {
        state.mine = newLists;
    },
};

export default { state, actions, mutations };
