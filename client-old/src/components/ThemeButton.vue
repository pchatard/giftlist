<script setup lang="ts">
import { darkModeInjectionKey } from "@/injectionSymbols";
import type { DarkModeData } from "@/types";
import { inject } from "vue";

import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const { isDarkMode, setIsDarkMode } = inject(
  darkModeInjectionKey
) as DarkModeData;
</script>

<template>
  <button
    class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 lg:cursor-pointer dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
    @click="setIsDarkMode"
  >
    <MoonIcon v-if="isDarkMode" class="w-6" />
    <SunIcon v-else class="w-6" />
  </button>
</template>
