import { createStore } from "vuex";
import { auth, AuthState } from "./auth";
import { list, ListState } from "./list";
import { gift, GiftState } from "./gift";
import { snackbar, SnackbarState } from "./snackbar";
import { preferences, PreferencesState } from "./preferences";

export default createStore({
	modules: {
		auth,
		list,
		gift,
		snackbar,
		preferences,
	},
});

export interface RootState {
	auth: AuthState;
	list: ListState;
	gift: GiftState;
	snackbar: SnackbarState;
	preferences: PreferencesState;
}
