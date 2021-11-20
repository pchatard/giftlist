import { User } from "@/types/User";
import { ActionPayload, Module } from "vuex";
import { RootState } from ".";

export const auth: Module<AuthState, RootState> = {
	state: initAuthState,
	getters: {
		fullName(state) {
			const fullName = `${state.user?.firstName} ${state.user?.lastName}`;
			return fullName;
		},
	},
	mutations: {
		SET_USER(state, user: User) {
			console.debug("auth.ts - SET_USER - Setting user to " + user);
			state.user = user;
		},
		CLEAR_USER(state) {
			console.debug("auth.ts - CLEAR_USER - Clearing user");
			state.user = undefined;
		},
		SET_LOGGED_STATUS(state, loggedIn: boolean) {
			console.debug("auth.ts - SET_LOGGED_USER - Setting loggedIn to " + loggedIn);
			state.loggedIn = loggedIn;
		},
	},
	actions: {
		async login(context, payload: ActionPayload) {
			return new Promise<void>((resolve, reject) => {
				console.debug("auth.ts - login");
				try {
					// TODO: Call /login route on backend
					// const { data } = AuthUtils.login({});
					// console.log(data);

					// TODO: If success & rememberMe, commit everything and save user to localStorage
					context.commit("SET_LOGGED_STATUS", true);
					const user: User = {
						firstName: "Test",
						id: "bchje",
						lastName: "Test",
						email: "bckjen",
					};
					context.commit("SET_USER", user);
					localStorage.setItem("giftlist-user", JSON.stringify(user));

					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async logout(context) {
			return new Promise<void>((resolve, reject) => {
				try {
					console.debug("auth.ts - logout");
					context.commit("SET_LOGGED_STATUS", false);
					context.commit("CLEAR_USER");
					localStorage.removeItem("giftlist-user");
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async register(context, _payload: ActionPayload) {
			return new Promise<void>((resolve, reject) => {
				console.debug("auth.ts - register");
				try {
					// TODO: Call /register route on backend

					// TODO: If success & rememberMe, commit everything and save user to localStorage
					context.commit("SET_LOGGED_STATUS", true);
					const user: User = {
						firstName: "Test",
						id: "bchje",
						lastName: "Test",
						email: "bckjen",
					};
					context.commit("SET_USER", user);
					localStorage.setItem("giftlist-user", JSON.stringify(user));

					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},
		async getUser(_context, _payload: ActionPayload) {
			console.debug("auth.ts - getUser");
		},
	},
};

export interface AuthState {
	loggedIn: boolean;
	user?: User;
}

function initAuthState(): AuthState {
	let loggedIn = false;
	const storageUser = localStorage.getItem("giftlist-user");

	let user = undefined;

	if (storageUser) {
		user = JSON.parse(storageUser);
		loggedIn = true;
	}
	return {
		loggedIn,
		user,
	};
}
