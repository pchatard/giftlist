import { createRouter, createWebHistory } from "vue-router";

import AppView from "@/views/AppView.vue";
import HomeView from "@/views/HomeView.vue";
import MyListsView from "@/views/MyListsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";
import ListView from "@/views/ListView.vue";
import GiftView from "@/views/GiftView.vue";
import ListFormView from "@/views/ListFormView.vue";
import GiftFormView from "@/views/GiftFormView.vue";
import ListSharing from "@/views/ListSharing.vue";

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
        headerOrder: 0,
      },
    },
    {
      path: "/app/lists/new",
      name: "Créer une liste",
      component: ListFormView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/shared",
      name: "Listes partagées",
      component: MyListsView,
      meta: {
        isHeaderLink: true,
        headerOrder: 1,
      },
    },
    {
      path: "/app/lists/shared/new",
      name: "Code de partage",
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
      path: "/app/lists/:listId/edit",
      name: "Modifier une liste",
      component: ListFormView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId/share",
      name: "Partager ma liste",
      component: ListSharing,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId/gift/new",
      name: "Créer un cadeau",
      component: GiftFormView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId/gift/:giftId",
      component: GiftView,
      meta: {
        isHeaderLink: false,
      },
    },
    {
      path: "/app/lists/:listId/gift/:giftId/edit",
      name: "Modifier un cadeau",
      component: GiftFormView,
      meta: {
        isHeaderLink: false,
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
