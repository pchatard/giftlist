import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { Module } from "vuex";
import { RootState } from ".";

export const snackbar: Module<SnackbarState, RootState> = {
	state: () => ({
		show: false,
		message: "",
		type: SnackbarEventEnum.ERROR,
	}),
	mutations: {
		SET_SNACKBAR_VISIBILITY: (state, showSnackbar: boolean) => {
			state.show = showSnackbar;
		},
		SET_SNACKBAR_MESSAGE: (state, message: string) => {
			state.message = message;
		},
		SET_SNACKBAR_TYPE: (state, type: SnackbarEventEnum) => {
			state.type = type;
		},
	},
	actions: {
		hideSnackbar: (context) => {
			context.commit("SET_SNACKBAR_VISIBILITY", false);
		},
		showSnackbar: (context, payload: SnackbarState) => {
			context.commit("SET_SNACKBAR_TYPE", payload.type);
			context.commit("SET_SNACKBAR_MESSAGE", payload.message);
			context.commit("SET_SNACKBAR_VISIBILITY", true);

			setTimeout(() => {
				context.dispatch("hideSnackbar");
			}, 4000);
		},
	},
};

export interface SnackbarState {
	show?: boolean;
	message: string;
	type?: SnackbarEventEnum;
}
