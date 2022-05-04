import { createStore } from "vuex";

import { gifts, GiftState } from "./gifts";
import { listForm, ListFormState } from "./listForm";
import { lists, ListsState } from "./lists";
import { preferences, PreferencesState } from "./preferences";
import { snackbar, SnackbarState } from "./snackbar";
import { user, UserState } from "./user";

export default createStore({
	modules: {
		user,
		lists,
		listForm,
		gifts,
		snackbar,
		preferences,
	},
});

export interface RootState {
	user: UserState;
	lists: ListsState;
	listForm: ListFormState;
	gift: GiftState;
	snackbar: SnackbarState;
	preferences: PreferencesState;
}
