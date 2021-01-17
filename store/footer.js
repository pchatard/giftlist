const state = () => ({
    showFooter: false,
});

const actions = {
    setFooter({ commit }, showFooter) {
        commit('SET_FOOTER', showFooter);
    },
};

const mutations = {
    SET_FOOTER: (state, showFooter) => {
        state.showFooter = showFooter;
    },
};

module.exports = { state, actions, mutations };
