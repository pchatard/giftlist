const state = () => ({
    lists: [],
});

const actions = {
    initialize: ({ commit }, lists) => {
        commit('POPULATE_LISTS', lists);
    },
    createList: ({ commit }, listName) => {
        // Call API to create a new list
        const newListObject = { name: listName };
        commit('NEW_LIST', newListObject);
    },
    deleteList: ({ commit }, listId) => {
        // Call API to remove a list
        commit('REMOVE_LIST', listId);
    },
};
const mutations = {
    POPULATE_LISTS: (state, lists) => {
        state.lists = lists;
    },
    NEW_LIST: (state, listName) => {
        state.lists.push(listName);
    },
    REMOVE_LIST: (state, listId) => {
        const listIndex = state.lists.findIndex((list) => list.id === listId);
        if (listIndex < 0) {
            // console.log('This list does not exist');
            return;
        }
        state.lists.splice(listIndex, 1);
    },
};

export default { state, actions, mutations };
