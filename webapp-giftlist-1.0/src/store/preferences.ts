import { Module } from "vuex";
import { RootState } from ".";

export const preferences: Module<PreferencesState, RootState> = {
	state: () => ({
		listDisplayModeIsGrid: false,
	}),
	mutations: {
		SET_LIST_DISPLAY_MODE: (state, listDisplayModeIsGrid: boolean) => {
			state.listDisplayModeIsGrid = listDisplayModeIsGrid;
		},
	},
	actions: {
		toggleListDisplayMode: (context) => {
			context.commit("SET_LIST_DISPLAY_MODE", !context.state.listDisplayModeIsGrid);
		},
	},
};

export interface PreferencesState {
	listDisplayModeIsGrid: boolean;
}
