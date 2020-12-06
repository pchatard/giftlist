const state = () => ({
    lists: [],
});

const actions = {
    createList: ({ commit }, listName) => {
        // Call API to create a new list
        const newListObject = { name: listName };
        commit('NEW_LIST', newListObject);
    },
};
const mutations = {
    NEW_LIST: (state, listName) => {
        state.lists.push(listName);
    },
};

export default { state, actions, mutations };
