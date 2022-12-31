import { createRouter, createWebHistory } from "vue-router";

import AppView from "@/views/AppView.vue";
import HomeView from "@/views/HomeView.vue";
import MyGiftsViewVue from "@/views/MyGiftsView.vue";
import MyListsView from "@/views/MyListsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SharedListsView from "@/views/SharedListsView.vue";
import ListView from "@/views/ListView.vue";
import SharedListView from "@/views/SharedListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Accueil",
      component: HomeView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app",
      name: "Dashboard",
      component: AppView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists",
      name: "Mes listes",
      component: MyListsView,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/lists/new",
      name: "Nouvelle liste",
      component: MyListsView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId",
      component: ListView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId/gift/new",
      name: "Nouveau cadeau",
      component: ListView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/shared",
      name: "Listes partagées",
      component: SharedListsView,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/shared/new",
      name: "Code de partage",
      component: SharedListsView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/shared/:listId",
      component: SharedListView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/gifts",
      name: "Mes cadeaux",
      component: MyGiftsViewVue,
      meta: {
        isHeaderLink: true,
      },
    },
    {
      path: "/app/profile",
      name: "Mon compte",
      component: ProfileView,
      meta: {
        isDropdownLink: true,
      },
    },
    {
      path: "/app/settings",
      name: "Paramètres",
      component: SettingsView,
      meta: {
        isDropdownLink: true,
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
