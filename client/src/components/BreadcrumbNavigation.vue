<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { HomeIcon } from "@heroicons/vue/24/outline";
import { inject } from "vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

const { breadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;
</script>

<template>
  <nav class="flex py-2.5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <RouterLink
          to="/app"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <HomeIcon class="w-4 mr-1 md:mr-2" />
          <span v-show="breadcrumbContent.length < 3" class="md:hidden">
            Accueil
          </span>
          <span class="hidden md:inline-block">Accueil</span>
        </RouterLink>
      </li>

      <li v-for="({ name, path }, index) in breadcrumbContent" :key="name">
        <div class="hidden md:flex items-center">
          <ChevronRightIcon class="w-4 text-gray-500 dark:text-gray-400" />
          <span
            v-if="index == breadcrumbContent.length - 1"
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
          >
            {{ name }}
          </span>
          <RouterLink
            v-else
            :to="path ?? ''"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ name }}
          </RouterLink>
        </div>

        <div class="md:hidden flex items-center">
          <ChevronRightIcon class="w-4 text-gray-500 dark:text-gray-400" />
          <span
            v-if="index == breadcrumbContent.length - 1"
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
          >
            {{ name }}
          </span>
          <RouterLink
            v-else
            :to="path ?? ''"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ name }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>
