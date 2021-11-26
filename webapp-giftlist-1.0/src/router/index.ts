import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import SharedList from "../views/SharedList.vue";
import Lists from "../views/Lists.vue";
import ListSettings from "../views/ListSettings.vue";
import SharedLists from "../views/SharedLists.vue";

import { listsNavbarCta } from "../views/Lists.vue";
import { listNavbarCta } from "../views/List.vue";
import { sharedListsNavbarCta } from "../views/SharedLists.vue";

import Auth0 from "@/auth";

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
                name: "Nouvelle liste",
            },
        },
    },
    {
        path: "/app/lists/new",
        name: "Nouvelle liste",
        component: Lists,
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
                name: "Nouvelle idée cadeau",
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
        component: List,
        beforeEnter: Auth0.routeGuard,
    },
    {
        path: "/app/lists/:id/gift/:giftId",
        name: "Cadeau",
        component: List,
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
                name: "Ajouter un code",
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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
