import { createStore } from "vuex";

import { gifts, GiftState } from "./gifts";
import { lists, ListsState } from "./lists";
import { preferences, PreferencesState } from "./preferences";
import { snackbar, SnackbarState } from "./snackbar";
import { user, UserState } from "./user";

export default createStore({
	modules: {
		user,
		lists,
		gifts,
		snackbar,
		preferences,
	},
});

export interface RootState {
	user: UserState;
	lists: ListsState;
	gift: GiftState;
	snackbar: SnackbarState;
	preferences: PreferencesState;
}
