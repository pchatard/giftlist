<script setup lang="ts">
import { provide } from "vue";
import { RouterView } from "vue-router";
import { useDarkMode } from "./composables/darkMode";
import {
  userInjectionKey,
  darkModeInjectionKey,
  breadcrumbContentInjectionKey,
} from "./injectionSymbols";

import GiftlistHeader from "./components/GiftlistHeader.vue";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation.vue";
import { useLogin } from "./composables/login";
import { useBreadcrumbContent } from "./composables/breadcrumbContent";

const { isLoggedIn, setIsLoggedIn } = useLogin();

provide(userInjectionKey, { isLoggedIn, setIsLoggedIn });
provide(darkModeInjectionKey, useDarkMode());
provide(breadcrumbContentInjectionKey, useBreadcrumbContent());
</script>

<template>
  <div class="flex flex-col">
    <GiftlistHeader />
    <main
      class="flex-1 bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800 pt-[70px]"
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
