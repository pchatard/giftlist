import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import List from "../views/List.vue";
import Profile from "../views/Profile.vue";
import SharedList from "../views/SharedList.vue";
import Lists from "../views/Lists.vue";
import SharedLists from "../views/SharedLists.vue";
import store from "@/store/index";

import { listsNavbarCta } from "../views/Lists.vue";
import { listNavbarCta } from "../views/List.vue";
import { sharedListsNavbarCta } from "../views/SharedLists.vue";

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
		path: "/",
		name: "Accueil",
		component: Home,
	},
	{
		path: "/login",
		name: "Connexion",
		component: Login,
	},
	{
		path: "/register",
		name: "Inscription",
		component: Register,
	},
	{
		path: "/app",
		name: "Dashboard",
		component: Dashboard,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/profile",
		name: "Mon compte",
		component: Profile,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/lists",
		name: "Mes listes",
		component: Lists,
		beforeEnter: checkConnectionGuard,
		meta: {
			navbarCta: {
				action: listsNavbarCta,
				name: "Nouvelle liste",
			},
		},
	},
	{
		path: "/app/lists/new",
		name: "Nouvelle liste",
		component: Lists,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/lists/:id",
		name: "Liste",
		component: List,
		beforeEnter: checkConnectionGuard,
		meta: {
			navbarCta: {
				action: listNavbarCta,
				name: "Nouvelle idée cadeau",
			},
		},
	},
	{
		path: "/app/lists/:id/new-gift",
		name: "Nouveau cadeau",
		component: List,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/lists/:id/gift/:id",
		name: "Cadeau",
		component: List,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/shared",
		name: "Mes listes partagées",
		component: SharedLists,
		beforeEnter: checkConnectionGuard,
		meta: {
			navbarCta: {
				action: sharedListsNavbarCta,
				name: "Ajouter un code",
			},
		},
	},
	{
		path: "/app/shared/new",
		name: "Nouvelle liste partagée",
		component: SharedLists,
		beforeEnter: checkConnectionGuard,
	},
	{
		path: "/app/shared/:code",
		name: "Liste partagée",
		component: SharedList,
		beforeEnter: checkConnectionGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
