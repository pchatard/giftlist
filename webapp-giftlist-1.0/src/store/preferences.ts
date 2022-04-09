import { Module } from "vuex";

import { RootState } from "./";

export const preferences: Module<PreferencesState, RootState> = {
	state: () => ({
		listView: undefined,
	}),
	mutations: {
		SET_LIST_VIEW: (state, isListView) => {
			state.listView = isListView;
		},
	},
	actions: {
		toggleListView: ({ commit }, isListView) => {
			commit("SET_LIST_VIEW", isListView);
		}
	},
};

export interface PreferencesState {
	listView?: boolean;
}
