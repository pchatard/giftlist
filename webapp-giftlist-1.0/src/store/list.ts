import { Gift } from "@/types/api/Gift";
import { List } from "@/types/api/List";
import { Module } from "vuex";
import { RootState } from ".";

const lists: List[] = [];
const gifts: Gift[] = [];

for (let i = 0; i < 12; i++) {
	const gift: Gift = {
		id: i.toString(),
		title: `Cadeau ${i + 1}`,
		isBooked: i % 3 === 0,
		isFavorite: i < 4,
		lists: [],
		category: { id: "1", title: "Demo" },
	};
	gifts.push(gift);
}
for (let i = 0; i < 5; i++) {
	const list: List = {
		id: `${i}`,
		title: `Liste ${i + 1}`,
		termDate: new Date(),
		isShared: i % 2 == 0,
		sharingCode: `abcd${i}`,
		gifts,
		owners: [],
	};
	list.gifts.forEach((gift) => gift.lists.push(list));
	lists.push(list);
}

export const list: Module<ListState, RootState> = {
	state: () => ({
		mine: lists,
		shared: lists.filter((l, i) => i % 2 === 1),
	}),
	getters: {
		getListById: (state: ListState) => (id: string) => {
			return state.mine.find((list: List) => list.id === id);
		},
	},
	mutations: {
		POPULATE_LISTS: (state: ListState, lists: ListState) => {
			state.mine = lists.mine;
			state.shared = lists.shared;
		},
		NEW_LIST: (state: ListState, list: List) => {
			state.mine.push(list);
		},
		NEW_SHARED_LIST: (state: ListState, newSharedList: List) => {
			state.shared.push(newSharedList);
		},
		UPDATE_LIST: (state: ListState, newList: List) => {
			const listIndex = state.mine.findIndex((list) => list.id === newList.id);
			if (listIndex >= 0) {
				state.mine.splice(listIndex, 1, newList);
			}
		},
		REMOVE_LIST: (state: ListState, newLists: ListState) => {
			state.mine = newLists.mine;
		},
	},
	actions: {
		async getSharedList({ commit, state }, sharingCode) {
			return new Promise<void>((resolve, reject) => {
				try {
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async deleteList({ commit, state }, listId) {
			return new Promise<void>((resolve, reject) => {
				try {
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
