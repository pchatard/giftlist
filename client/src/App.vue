<script setup lang="ts">
import { ref, provide } from "vue";
import { RouterView } from "vue-router";
import { useDarkMode } from "./composables/darkMode";
import { userInjectionKey, darkModeInjectionKey } from "./injectionSymbols";

import GiftlistHeader from "./components/GiftlistHeader.vue";

const isLoggedIn = ref(true);
const setIsLoggedIn = () => {
  isLoggedIn.value = !isLoggedIn.value;
};
const { isDarkMode, setIsDarkMode } = useDarkMode();

provide(userInjectionKey, { isLoggedIn, setIsLoggedIn });
provide(darkModeInjectionKey, { isDarkMode, setIsDarkMode });
</script>

<template>
  <GiftlistHeader />
  <RouterView class="border border-red-600" />
</template>

<style scoped></style>
