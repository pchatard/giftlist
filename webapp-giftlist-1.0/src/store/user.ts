import Users from "@/api/Users";
import { UserDTO } from "@/types/dto/UserDTO";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { Module } from "vuex";

import { RootState } from ".";
import { SnackbarState } from "./snackbar";

export const user: Module<UserState, RootState> = {
	state: initAuthState,
	getters: {},
	mutations: {
		FILL_USER: (state: UserState, user: UserDTO) => {
			state.user = {
				...user,
			};
		},
		EMPTY_USER: (state) => {
			state.user.displayName = "";
			state.user.email = "";
		},
	},
	actions: {
		getUser: async (context) => {
			const response = await Users.me();
			if (response instanceof Error) {
				// TODO : Redirect to error page
				return;
			}
			context.commit("FILL_USER", response);
		},
		deleteAccount: async (context) => {
			const response = await Users.delete();
			if (response) {
				const snackbar: SnackbarState = {
					type: SnackbarEventEnum.ERROR,
					message: "Une erreur est survenue. Veuillez réessayer utlérieurement.",
				};
				context.dispatch("showSnackbar", snackbar);
				return false;
			}
			context.commit("EMPTY_USER");
			return true;
		},
	},
};

export interface UserState {
	user: UserDTO;
}

function initAuthState(): UserState {
	return {
		user: {
			displayName: "",
			email: "",
		},
	};
}
