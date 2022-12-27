<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useDarkMode } from "./composables/darkMode";
import { userInjectionKey, darkModeInjectionKey } from "./injectionSymbols";

import GiftlistHeader from "./components/GiftlistHeader.vue";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation.vue";

const isLoggedIn = ref(false);
const setIsLoggedIn = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

const headerHeightClass = ref("");
const { isDarkMode, setIsDarkMode } = useDarkMode();

provide(userInjectionKey, { isLoggedIn, setIsLoggedIn });
provide(darkModeInjectionKey, { isDarkMode, setIsDarkMode });

onMounted(() => {
  headerHeightClass.value = `mt-[${
    document.getElementById("navbar")?.clientHeight ?? 0
  }px]`;
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <GiftlistHeader />
    <main
      class="flex-1 bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800"
      :class="headerHeightClass"
    >
      <div
        class="flex flex-col flex-wrap justify-between mx-auto max-w-screen-xl"
      >
        <BreadcrumbNavigation v-if="isLoggedIn" />
        <RouterView class="text-gray-900 dark:text-gray-400" />
      </div>
    </main>
  </div>
</template>

<style></style>
