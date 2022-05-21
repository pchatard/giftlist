import {
	createRouter,
	createWebHistory,
	NavigationGuardWithThis,
	RouteRecordRaw,
} from "vue-router";

import Auth0 from "@/auth";
import labels from "@/labels/fr/labels.json";

import ErrorView from "@/views/ErrorView.vue";
import FriendsView from "@/views/FriendsView.vue";
import GiftView from "@/views/GiftView.vue";
import HomeView from "@/views/HomeView.vue";
import ListView from "@/views/ListView.vue";
import ListsView from "@/views/ListsView.vue";
import ListSettingsView from "@/views/ListSettingsView.vue";
import NewGiftView from "@/views/NewGiftView.vue";
import NewListView from "@/views/NewListView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RedirectView from "@/views/RedirectView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SharedListView from "@/views/SharedListView.vue";
import SharedListsView from "@/views/SharedListsView.vue";
import StylesView from "@/views/StylesView.vue";

const redirectNavigationGuard: NavigationGuardWithThis<undefined> = () => {
	const redirect_route = localStorage.getItem("giftlist-redirect");
	if (redirect_route) {
		localStorage.removeItem("giftlist-redirect");
		return redirect_route;
	}
	return { name: "Mes listes" };
};

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Accueil",
		component: HomeView,
	},
	{
		path: "/styles",
		name: "Styles",
		component: StylesView,
	},
	{
		path: "/app/redirect",
		name: "Redirecting...",
		component: RedirectView,
		beforeEnter: [Auth0.routeGuard, redirectNavigationGuard],
	},
	{
		path: "/app/error",
		name: "Erreur",
		component: ErrorView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/profile",
		name: "Mon compte",
		component: ProfileView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/profile/friends",
		name: "Mes amis",
		component: FriendsView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/settings",
		name: "Mes préférences",
		component: SettingsView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists",
		name: "Mes listes",
		component: ListsView,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				name: labels.navbar.actions.lists,
			},
		},
	},
	{
		path: "/app/lists/new",
		name: "Nouvelle liste",
		component: NewListView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id",
		name: "Liste",
		component: ListView,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				name: labels.navbar.actions.list,
			},
		},
	},
	{
		path: "/app/lists/:id/settings",
		name: "Paramètres de la liste",
		component: ListSettingsView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id/new-gift",
		name: "Nouveau cadeau",
		component: NewGiftView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/lists/:id/gift/:giftId",
		name: "Cadeau",
		component: GiftView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/shared",
		name: "Mes listes partagées",
		component: SharedListsView,
		beforeEnter: Auth0.routeGuard,
		meta: {
			navbarCta: {
				name: labels.navbar.actions.shared,
			},
		},
	},
	{
		path: "/app/shared/new",
		name: "Nouvelle liste partagée",
		component: SharedListsView,
		beforeEnter: Auth0.routeGuard,
	},
	{
		path: "/app/shared/:code",
		name: "Liste partagée",
		component: SharedListView,
		beforeEnter: Auth0.routeGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
