<script setup lang="ts">
import { ref, provide } from "vue";
import { RouterView } from "vue-router";
import { useDarkMode } from "./composables/darkMode";
import { userInjectionKey, darkModeInjectionKey } from "./injectionSymbols";

import GiftlistHeader from "./components/GiftlistHeader.vue";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation.vue";

const isLoggedIn = ref(false);
const setIsLoggedIn = () => {
  isLoggedIn.value = !isLoggedIn.value;
};
const { isDarkMode, setIsDarkMode } = useDarkMode();

provide(userInjectionKey, { isLoggedIn, setIsLoggedIn });
provide(darkModeInjectionKey, { isDarkMode, setIsDarkMode });
</script>

<template>
  <GiftlistHeader />
  <main class="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div
      class="flex flex-col flex-wrap justify-between mx-auto max-w-screen-xl"
    >
      <BreadcrumbNavigation v-if="isLoggedIn" />
      <RouterView class="text-gray-900 dark:text-gray-400" />
    </div>
  </main>
</template>

<style scoped></style>
