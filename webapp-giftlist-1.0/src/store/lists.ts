import { Module } from "vuex";

import Lists from "@/api/Lists";
import { ListDTO } from "@/types/dto/ListDTO";
import { CreateListPayload } from "@/types/payload/CreateListPayload";
import { EditListPayload } from "@/types/payload/EditListPayload";
import { GetListsPayload } from "@/types/payload/GetListsPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { ListSharingCodePayload } from "@/types/payload/ListSharingCodePayload";

import { RootState } from "./";

export const lists: Module<ListsState, RootState> = {
	state: () => ({
		owned: [],
		granted: [],
		selected: initSelectedList(),
	}),
	getters: {
		getListIndex: (state) => (listId: string) => {
			return state.owned.findIndex((list: ListDTO) => list.id === listId);
		},
	},
	mutations: {
		FILL_OWNED_LISTS: (state, owned: ListDTO[]) => {
			state.owned = owned;
		},
		FILL_GRANTED_LISTS: (state, granted: ListDTO[]) => {
			state.granted = granted;
		},
		FILL_LIST: (state, list: ListDTO) => {
			state.selected = list;
		},
		EMPTY_LIST: (state) => {
			state.selected = initSelectedList();
		},
		ADD_LIST: (state, newList: ListDTO) => {
			state.owned.push(newList);
		},
		DELETE_LIST: (state, listIndex: number) => {
			state.owned.splice(listIndex, 1);
		},
		EDIT_LIST: (state, { listIndex, editedList }: { listIndex: number; editedList: ListDTO }) => {
			state.owned.splice(listIndex, 1, editedList);
		},
	},
	actions: {
		getLists: async ({ commit }, { auth, select }: GetListsPayload) => {
			const lists = await Lists.get(auth, select);
			if (lists) {
				commit(`FILL_${select.toUpperCase()}_LISTS`, lists);
				return true;
			}
		},
		getList: async ({ commit }, { auth, listId }: ListIdPayload) => {
			const list = await Lists.getOne(auth, listId);
			if (list) {
				commit("FILL_LIST", list);
				return true;
			}
		},
		createList: async ({ commit }, { auth, newList }: CreateListPayload) => {
			const result = await Lists.create(auth, newList);
			if (result) {
				const newList = await Lists.getOne(auth, result.id);
				if (newList) {
					commit("ADD_LIST", newList);
					return true;
				}
			}
			// Handle errors here
		},
		deleteList: async ({ commit, getters }, { auth, listId }: ListIdPayload) => {
			const success = await Lists.delete(auth, listId);
			if (success) {
				const listIndex = getters.getListIndex(listId);
				if (listIndex >= 0) {
					commit("DELETE_LIST", listIndex);
					return true;
				}
			}

			// Handle errors here
		},
		editList: async (
			{ commit, getters, state },
			{ auth, listId, partialList }: EditListPayload
		) => {
			const success = await Lists.edit(auth, listId, partialList);
			if (success) {
				const listIndex = getters.getListIndex(listId);
				if (listIndex >= 0) {
					const editedList: ListDTO = {
						...state.owned[listIndex],
						...partialList,
					};
					commit("EDIT_LIST", { listIndex, editedList });
					return true;
				}
			}

			// Handle errors here
		},
		shareList: async ({ commit, getters, state }, { auth, listId }: ListIdPayload) => {
			const success = await Lists.share(auth, listId);
			if (success) {
				const listIndex = getters.getListIndex(listId);
				if (listIndex >= 0) {
					const editedList: ListDTO = {
						...state.owned[listIndex],
						isShared: true,
					};
					commit("EDIT_LIST", { listIndex, editedList });
					commit("FILL_LIST", editedList);
					return;
				}
			}
			// Handle errors here
		},
		unshareList: async ({ commit, getters, state }, { auth, listId }: ListIdPayload) => {
			const success = await Lists.unshare(auth, listId);
			if (success) {
				const listIndex = getters.getListIndex(listId);
				if (listIndex >= 0) {
					const editedList: ListDTO = {
						...state.owned[listIndex],
						isShared: false,
						sharingCode: "",
					};
					commit("EDIT_LIST", { listIndex, editedList });
					commit("FILL_LIST", editedList);
					return;
				}
			}
			// Handle errors here
		},
		accessList: async (
			{ dispatch, commit, state },
			{ auth, sharingCode }: ListSharingCodePayload
		) => {
			const successAccess = await Lists.getAccessFromSharingCode(auth, sharingCode);
			if (successAccess) {
				const successGet = await dispatch("getLists", { auth, select: "granted" });
				if (successGet) {
					const listIndex = state.granted.findIndex(
						(list: ListDTO) => list.sharingCode === sharingCode
					);
					if (listIndex >= 0) {
						commit("FILL_LIST", state.granted[listIndex]);
					}
				}
				return true;
			}
			// Handle errors here
		},
	},
};

const initSelectedList = (): ListDTO => {
	return {
		id: "",
		title: "",
		sharingCode: "",
		isShared: false,
	};
};

export interface ListsState {
	owned: ListDTO[];
	granted: ListDTO[];
	selected: ListDTO;
}
