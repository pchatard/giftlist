import { createStore } from 'vuex';
import { auth, AuthState } from './auth';
import { list, ListState } from './list';
import { gift, GiftState } from './gift';

export default createStore({
	modules: {
		auth,
		list,
		gift,
	},
});

export interface RootState {
	auth: AuthState;
	list: ListState;
	gift: GiftState;
}
