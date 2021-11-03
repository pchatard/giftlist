import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import List from '../views/List.vue';
import Profile from '../views/Profile.vue';
import SharedList from '../views/SharedList.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
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
	},
	{
		path: '/app/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/app/lists/:id',
		name: 'List',
		component: List,
	},
	{
		path: '/app/lists/shared/:code',
		name: 'Shared List',
		component: SharedList,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
