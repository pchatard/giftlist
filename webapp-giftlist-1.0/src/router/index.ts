import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/Home.vue";
import List from "../views/List/List.vue";
import Profile from "../views/Profile/Profile.vue";
import Friends from "../views/Friends/Friends.vue";
import Settings from "../views/Settings/Settings.vue";
import SharedList from "../views/SharedList/SharedList.vue";
import Lists from "../views/Lists/Lists.vue";
import ListSettings from "../views/ListSettings/ListSettings.vue";
import SharedLists from "../views/SharedLists/SharedLists.vue";
import NewList from "../views/NewList/NewList.vue";
import NewGift from "../views/NewGift/NewGift.vue";
import Gift from "../views/Gift/Gift.vue";
import BookedGifts from "../views/BookedGifts/BookedGifts.vue";

import labels from "@/labels/fr/labels.json";

import Auth0 from "@/auth";

const sharedListsNavbarCta = (): void => {
	console.debug("SharedLists - sharedListsNavbarCta - Opening new sharing code modal");
	router.push("/app/shared/new");
};

const listNavbarCta = (): void => {
	const listId = router.currentRoute.value.params.id;
	router.push(`/app/lists/${listId}/new-gift`);
};

const listsNavbarCta = (): void => {
	router.push("/app/lists/new");
};

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Accueil",
		component: Home,
	},
	{
		path: "/app/profile",
		name: "Mon compte",
		component: Profile,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/profile/friends",
		name: "Mes amis",
		component: Friends,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/settings",
		name: "Mes préférences",
		component: Settings,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists",
		name: "Mes listes",
		component: Lists,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				action: listsNavbarCta,
				name: labels.navbar.actions.lists,
			},
		},
	},
	{
		path: "/app/lists/new",
		name: "Nouvelle liste",
		component: NewList,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id",
		name: "Liste",
		component: List,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				action: listNavbarCta,
				name: labels.navbar.actions.list,
			},
		},
	},
	{
		path: "/app/lists/:id/settings",
		name: "Paramètres de la liste",
		component: ListSettings,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id/new-gift",
		name: "Nouveau cadeau",
		component: NewGift,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id/gift/:giftId",
		name: "Cadeau",
		component: Gift,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/shared",
		name: "Mes listes partagées",
		component: SharedLists,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				action: sharedListsNavbarCta,
				name: labels.navbar.actions.shared,
			},
		},
	},
	{
		path: "/app/shared/new",
		name: "Nouvelle liste partagée",
		component: SharedLists,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/shared/:code",
		name: "Liste partagée",
		component: SharedList,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/booked",
		name: "Mes cadeaux réservés",
		component: BookedGifts,
		beforeEnter: Auth0.routeGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
