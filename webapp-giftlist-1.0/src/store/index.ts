import { createStore } from "vuex";

import { gift, GiftState } from "./gift";
import { list, ListState } from "./list";
import { preferences, PreferencesState } from "./preferences";
import { snackbar, SnackbarState } from "./snackbar";
import { user, UserState } from "./user";

export default createStore({
	modules: {
		user,
		list,
		gift,
		snackbar,
		preferences,
	},
});

export interface RootState {
	user: UserState;
	list: ListState;
	gift: GiftState;
	snackbar: SnackbarState;
	preferences: PreferencesState;
}
