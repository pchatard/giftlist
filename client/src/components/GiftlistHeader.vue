<script setup lang="ts">
import type { HeaderLinks } from "@/types";
import { ref, computed, onMounted, onUnmounted } from "vue";

import { RouterLink, useRoute, useRouter } from "vue-router";
import HamburgerButton from "./HamburgerButton.vue";
import ThemeButton from "./ThemeButton.vue";
import DropdownButton, {
  type DropdownButtonOption,
  type DropdownButtonProps,
} from "./DropdownButton.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
const handleSignup = () => {
  loginWithRedirect({ screen_hint: "signup" });
};
const handleLogin = () => {
  loginWithRedirect();
};

const handleLogout = () => {
  logout({ returnTo: window.location.origin });
};

const isMobileMenuOpened = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpened.value = !isMobileMenuOpened.value;
};

const router = useRouter();
const currentRoute = useRoute();

const links = computed<Array<HeaderLinks>>(() =>
  router
    .getRoutes()
    .filter((route) => route.meta.isHeaderLink)
    .sort(
      (a, b) => (a.meta.headerOrder as number) - (b.meta.headerOrder as number)
    )
    .map((route) => ({
      path: route.path.toString(),
      name: route.name?.toString() || "",
      isActive: currentRoute.matched.includes(route),
      isExactActive: currentRoute.path == route.path,
    }))
);

const headerDropdownProps: DropdownButtonProps = {
  text: user.value.nickname || "undefined",
  options: [
    ...router
      .getRoutes()
      .filter((route) => route.meta.isDropdownLink)
      .map((route) => ({
        path: route.path.toString(),
        name: route.name?.toString() || "",
        isActive: currentRoute.matched.includes(route),
        isExactActive: currentRoute.path == route.path,
      })),
    {
      name: "Déconnexion",
      callback: () => {
        handleLogout();
      },
    },
  ],
};

const handleDropdownSelect = (selectedOption: DropdownButtonOption) => {
  if (selectedOption.callback != undefined) {
    selectedOption.callback();
  } else if (selectedOption.path != undefined) {
    router.push(selectedOption.path);
  }
};

const handleMobileMenuClick = () => {
  if (isMobileMenuOpened.value) {
    toggleMobileMenu();
  }
};

let eventListenerCloseFunction: (e: MouseEvent) => void;

onMounted(() => {
  eventListenerCloseFunction = (e) => {
    const mobileMenu = document.querySelectorAll("header nav")[0];

    if (e.target instanceof Node && !mobileMenu?.contains(e.target)) {
      isMobileMenuOpened.value = false;
    }
  };

  document.addEventListener("click", eventListenerCloseFunction);
});
onUnmounted(() => {
  document.removeEventListener("click", eventListenerCloseFunction);
});
</script>

<template>
  <header>
    <nav
      class="bg-white px-4 py-2.5 dark:bg-gray-800 w-full fixed top-0 z-20 left-0 border-b border-gray-200 dark:border-gray-600"
      :class="[isMobileMenuOpened ? 'shadow-lg' : 'shadow-none']"
    >
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <RouterLink
          :to="isAuthenticated ? '/app' : '/'"
          class="self-center text-xl font-satisfy font-semibold whitespace-nowrap dark:text-white"
        >
          giftlist
        </RouterLink>
        <div class="flex items-center lg:order-2">
          <ThemeButton />
          <a
            v-if="!isAuthenticated"
            href="#"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            @click="handleLogin"
            >Se connecter</a
          >
          <a
            v-if="!isAuthenticated"
            href="#"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="handleSignup"
            >S'inscrire</a
          >
          <DropdownButton
            v-if="isAuthenticated"
            class="hidden lg:block"
            :text="headerDropdownProps.text"
            :options="headerDropdownProps.options"
            @select="handleDropdownSelect"
          />
          <HamburgerButton
            v-if="isAuthenticated"
            @click.stop="toggleMobileMenu"
          />
        </div>
        <div
          id="mobile-menu-2"
          class="justify-between items-center w-full mt-2 lg:m-0 lg:flex lg:w-auto lg:order-1 rounded-lg"
          :class="isMobileMenuOpened ? '' : 'hidden'"
          @click.stop="handleMobileMenuClick"
        >
          <ul
            v-if="isAuthenticated"
            class="flex flex-col font-medium lg:flex-row lg:space-x-8"
          >
            <li v-for="(link, index) in links" :key="link.path">
              <RouterLink
                :to="link.path"
                class="block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700"
                :class="[
                  link.isActive
                    ? 'text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent',
                  index == links.length - 1 ? 'border-b-0' : '',
                ]"
                aria-current="page"
                >{{ link.name }}
              </RouterLink>
            </li>
          </ul>
          <ul
            v-if="isAuthenticated"
            class="flex flex-col mt-8 font-medium lg:hidden"
          >
            <li
              v-for="link in headerDropdownProps.options.filter(
                (option) => option.path
              )"
              :key="link.name"
            >
              <RouterLink
                :to="link.path ?? '#'"
                class="block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700"
                :class="[
                  link.path == currentRoute.path
                    ? 'text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent',
                ]"
                aria-current="page"
                >{{ link.name }}
              </RouterLink>
            </li>
            <li
              class="block lg:hidden py-2 pr-4 pl-3 border-b border-gray-100 last:border-b-0 lg:border-0 lg:p-0 cursor-pointer dark:border-gray-700 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              @click="handleLogout"
            >
              Déconnexion
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
