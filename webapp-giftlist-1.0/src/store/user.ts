import { Module } from "vuex";

import Users from "@/api/Users";
import { UserDTO } from "@/types/dto/UserDTO";

import { RootState } from "./";

export interface UserState extends UserDTO {
	errorText: "";
}

function initAuthState(): UserState {
	return {
		displayName: "",
		email: "",
		errorText: "",
	};
}

export const user: Module<UserState, RootState> = {
	state: initAuthState,
	getters: {},
	mutations: {
		FILL_USER: (state: UserState, user: UserDTO) => {
			state = Object.assign(state, user);
		},
		EMPTY_USER: (state: UserState) => {
			state.displayName = "";
			state.email = "";
		},
	},
	actions: {
		getUser: async (context, auth) => {
			const user = await Users.me(auth);
			if (user) {
				context.commit("FILL_USER", user);
			}
		},
		deleteAccount: async (context, auth) => {
			const response = await Users.delete(auth);
			if (response) {
				// Reset state
				context.commit("EMPTY_USER");
				return true;
			} else {
				// Do nothing, a snackbar is being displayed
				return false;
			}
		},
	},
};
