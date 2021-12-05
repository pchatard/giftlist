import { List } from "@/types/List";
import { Module } from "vuex";
import { RootState } from ".";

export const list: Module<ListState, RootState> = {
    state: () => ({
        mine: [],
        shared: [],
    }),
    getters: {
        getListById: (state) => (id: string) => {
            return state.mine.find((list: List) => list.id === id);
        },
    },
    mutations: {
        POPULATE_LISTS: (state, lists: ListState) => {
            state.mine = lists.mine;
            state.shared = lists.shared;
        },
        NEW_LIST: (state, list: List) => {
            state.mine.push(list);
        },
        NEW_SHARED_LIST: (state, newSharedList: List) => {
            state.shared.push(newSharedList);
        },
        UPDATE_LIST: (state, newList: List) => {
            const listIndex = state.mine.findIndex((list) => list.id === newList.id);
            if (listIndex >= 0) {
                state.mine.splice(listIndex, 1, newList);
            }
        },
        REMOVE_LIST: (state, newLists: ListState) => {
            console.debug("list.ts - REMOVE_LIST - Updating lists");
            state.mine = newLists.mine;
        },
    },
    actions: {
        async initializeLists({ commit, state }) {
            // const lists = await this.$axios.$get('/api/lists/mine', {
            //     withCredentials: true,
            // });
            const lists: List[] = [];
            for (let i = 0; i < 5; i++) {
                const list: List = {
                    id: `${i}`,
                    name: `Liste ${i + 1}`,
                    public: i % 2 == 0,
                    sharingCode: `${i}`
                };
                lists.push(list);
            }
            const listState: ListState = {
                mine: lists,
                shared: lists.filter((list: List) => list.public),
            };
            commit("POPULATE_LISTS", listState);
            return state;
        },
        // async createList({ commit }, name) {
        //     const response = await this.$axios.$post(
        //         '/api/lists',
        //         { name },
        //         { withCredentials: true }
        //     );
        //     if (response.err) {
        //         return response.err.message;
        //     } else {
        //         commit('NEW_LIST', response);
        //         return false;
        //     }
        // },
        // async shareList({ commit, state }, { listId, returnLists = true }) {
        //     const { list: newList } = await this.$axios.$get(
        //         `/api/lists/${listId}/share`,
        //         {
        //             withCredentials: true,
        //         }
        //     );
        //     commit('UPDATE_LIST', newList);
        //     if (returnLists) {
        //         return state;
        //     } else {
        //         return newList;
        //     }
        // },
        // async privateList({ commit, state }, { listId, returnLists = true }) {
        //     const { list } = await this.$axios.$get(
        //         `/api/lists/${listId}/private`,
        //         {
        //             withCredentials: true,
        //         }
        //     );
        //     commit('UPDATE_LIST', list);
        //     if (returnLists) {
        //         return state;
        //     } else {
        //         return list;
        //     }
        // },
        async getSharedList({ commit, state }, sharingCode: string) {
            return new Promise<void>((resolve, reject) => {
                try {
                    console.debug("list.ts - getSharedList - Get shared list with code " + sharingCode);
                    if (Math.random() > .5) {
                        resolve();
                    } else {
                        throw new Error("Code incorrect");
                    }
                } catch (error) {
                    reject(error);
                }
            });
            // const response = await this.$axios.$get(
            //     `/api/lists/shared/${sharingCode}`,
            //     { withCredentials: true }
            // );
            // if (response.err) {
            //     return response.err.message;
            // } else if (
            //     state.shared.findIndex((list) => list.id === response.id) >= 0
            // ) {
            //     return false;
            // } else {
            //     commit('NEW_SHARED_LIST', response);
            // }
        },
        // async updateList({ commit }, { name, id }) {
        //     const response = await this.$axios.$put(
        //         `/api/lists/${id}`,
        //         {
        //             name,
        //         },
        //         { withCredentials: true }
        //     );
        //     if (response.err) {
        //         return response.err.message;
        //     } else {
        //         commit('UPDATE_LIST', response);
        //         return false;
        //     }
        // },
        async deleteList({ commit, state }, listId) {
            return new Promise<void>((resolve, reject) => {
                try {
                    console.debug("list.ts - deleteList - Deleting list " + listId);
                    // Delete on backend

                    // Remove from state
                    const mine = state.mine;
                    mine.splice(
                        mine.findIndex((list) => list.id === listId),
                        1
                    );

                    commit("REMOVE_LIST", { mine, shared: state.shared });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
    },
};

export interface ListState {
    mine: List[];
    shared: List[];
}