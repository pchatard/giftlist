import { Gift } from "@/types/api/Gift";
import { List } from "@/types/api/List";
import { Module } from "vuex";
import { RootState } from ".";

const lists: List[] = [];
const gifts: Gift[] = [];

for (let i = 0; i < 6; i++) {
	const gift: Gift = {
		id: i.toString(),
		title: `Cadeau ${i + 1}`,
		isBooked: i % 3 === 0,
		isFavorite: i < 1,
		lists: [],
		category: { id: "1", name: "Demo" },
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
	list.gifts.forEach((gift) => gift.lists?.push(list));
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
					if (!sharingCode) {
						throw new Error("Veuillez entrer un code de partage.");
					}
					// Call server here and update necessary state
					console.log(sharingCode);
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
		async createList({ commit, state }, listInformation) {
			return new Promise<void>((resolve, reject) => {
				try {
					// Formalize list

					// Create on backend
					const id1 = `${Math.floor(Math.random() * 10000)}${state.mine.length}`;
					const id2 = `${Math.floor(Math.random() * 10000)}${state.mine.length}`;

					const list: List = {
						id: id1,
						title: listInformation.step1.title.value,
						termDate: listInformation.step1.termDate.value,
						isShared: listInformation.step2.shared,
						sharingCode: `${id1}-${id2}`,
						gifts: [],
						owners: listInformation.step2.owners,
					};

					// Add to state
					commit("NEW_LIST", list);
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async updateList() {
			// TODO
			return new Promise<void>((resolve, reject) => {
				try {
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
