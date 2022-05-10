import { createStore } from "vuex";

import { gifts, GiftState } from "./gifts";
import { giftForm, GiftFormState } from "./gift-form";
import { listForm, ListFormState } from "./list-form";
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
		giftForm,
		snackbar,
		preferences,
	},
});

export interface RootState {
	user: UserState;
	lists: ListsState;
	listForm: ListFormState;
	gift: GiftState;
	giftForm: GiftFormState;
	snackbar: SnackbarState;
	preferences: PreferencesState;
}
