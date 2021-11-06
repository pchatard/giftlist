import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import List from '../views/List.vue';
import Profile from '../views/Profile.vue';
import SharedList from '../views/SharedList.vue';
import Lists from '../views/Lists.vue';
import SharedLists from '../views/SharedLists.vue';
import store from '@/store/index';

const checkConnectionGuard: NavigationGuard = (to, from, next) => {
	// TODO : Add a notification banner ?
	if (store.state.auth.loggedIn) {
		next();
	} else {
		next(from);
	}
};

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/app',
		name: 'Dashboard',
		component: Dashboard,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: '/app/profile',
		name: 'Profile',
		component: Profile,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: '/app/lists/',
		name: 'My Lists',
		component: Lists,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: '/app/lists/:id',
		name: 'List',
		component: List,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: '/app/lists/shared',
		name: 'Shared Lists',
		component: SharedLists,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: '/app/lists/shared/:code',
		name: 'Shared List',
		component: SharedList,
		beforeEnter: checkConnectionGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
