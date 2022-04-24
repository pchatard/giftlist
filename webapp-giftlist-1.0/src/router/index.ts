import {
	createRouter,
	createWebHistory,
	NavigationGuardWithThis,
	RouteRecordRaw,
} from "vue-router";

import Auth0 from "@/auth";
import labels from "@/labels/fr/labels.json";

import BookedGiftsView from "@/views/BookedGiftsView.vue";
import ErrorView from "@/views/ErrorView.vue";
import FriendsView from "@/views/Friends/FriendsView.vue";
import GiftView from "@/views/Gift/GiftView.vue";
import HomeView from "@/views/Home/HomeView.vue";
import ListView from "@/views/List/ListView.vue";
import ListsView from "@/views/ListsView.vue";
import ListSettingsView from "@/views/ListSettingsView.vue";
import NewGiftView from "@/views/NewGift/NewGiftView.vue";
import NewListView from "@/views/NewListView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RedirectView from "@/views/RedirectView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SharedListView from "@/views/SharedListView.vue";
import SharedListsView from "@/views/SharedListsView.vue";

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

const redirectNavigationGuard: NavigationGuardWithThis<undefined> = (to: any, from: any) => {
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
				action: listsNavbarCta,
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
				action: listNavbarCta,
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
				action: sharedListsNavbarCta,
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
	{
		path: "/app/booked",
		name: "Mes cadeaux réservés",
		component: BookedGiftsView,
		beforeEnter: Auth0.routeGuard,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
