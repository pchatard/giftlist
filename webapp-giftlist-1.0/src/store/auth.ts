import { Module } from "vuex";

import { RootState } from "./";

export const auth: Module<AuthState, RootState> = {
	state: initAuthState,
	getters: {},
	mutations: {},
	actions: {},
};

export interface AuthState {
	isAuthenticated: boolean;
	loading: boolean;
	// user: object,
}

function initAuthState(): AuthState {
	return {
		isAuthenticated: false,
		loading: false,
		// user: {},
	};
}
