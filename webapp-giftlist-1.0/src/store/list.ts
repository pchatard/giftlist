import { PersonalList, SharedList } from '@/types/List';
import { Module } from 'vuex';
import { RootState } from '.';

const endpoint = `${process.env.API_URL}/api/list`;

export const list: Module<ListState, RootState> = {
	state: () => ({
		mine: [],
		shared: [],
	}),
	getters: {},
	mutations: {
		POPULATE_LISTS: (state, lists: ListState) => {
			state.mine = lists.mine;
			state.shared = lists.shared;
		},
		NEW_LIST: (state, list: PersonalList) => {
			state.mine.push(list);
		},
		NEW_SHARED_LIST: (state, newSharedList: SharedList) => {
			state.shared.push(newSharedList);
		},
		UPDATE_LIST: (state, newList: PersonalList) => {
			const listIndex = state.mine.findIndex((list) => list.id === newList.id);
			if (listIndex >= 0) {
				state.mine.splice(listIndex, 1, newList);
			}
		},
		REMOVE_LIST: (state, newLists: ListState) => {
			state.mine = newLists.mine;
		},
	},
	actions: {
		// async initialize({ commit, state }) {
		//     const lists = await this.$axios.$get('/api/lists/mine', {
		//         withCredentials: true,
		//     });
		//     commit('POPULATE_LISTS', lists);
		//     return state;
		// },
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
		// async getSharedList({ commit, state }, sharingCode) {
		//     const response = await this.$axios.$get(
		//         `/api/lists/shared/${sharingCode}`,
		//         { withCredentials: true }
		//     );
		//     if (response.err) {
		//         return response.err.message;
		//     } else if (
		//         state.shared.findIndex((list) => list.id === response.id) >= 0
		//     ) {
		//         return false;
		//     } else {
		//         commit('NEW_SHARED_LIST', response);
		//     }
		// },
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
		// async deleteList({ commit, state }, listId) {
		//     const newLists = await this.$axios.$delete(`/api/lists/${listId}`, {
		//         withCredentials: true,
		//     });
		//     commit('REMOVE_LIST', newLists);
		//     return state;
		// },
	},
};

export interface ListState {
	mine: PersonalList[];
	shared: SharedList[];
}
