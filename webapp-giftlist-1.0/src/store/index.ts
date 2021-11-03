import { createStore } from 'vuex';
import { auth } from './auth';
import { list } from './list';
import { gift } from './gift';

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		list,
		gift,
	},
});

export interface RootState {
	dd?: any;
}
