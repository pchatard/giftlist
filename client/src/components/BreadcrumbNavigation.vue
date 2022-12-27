<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { HomeIcon } from "@heroicons/vue/24/outline";
import { ref, watch } from "vue";

const breadcrumbItems = ref<string[]>([]);

const route = useRoute();
const router = useRouter();

watch(route, (routeNew) => {
  let routeParts = routeNew.fullPath.split("/");
  routeParts = routeParts
    .filter((route) => route !== "" && route !== "app")
    .map((pathPart) => `/${pathPart}`);
  breadcrumbItems.value = routeParts.map(
    (_part, i, arr) => "/app" + arr.slice(0, i == 0 ? 1 : i + 1).join("")
  );
});
</script>

<template>
  <nav class="flex py-2.5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <RouterLink
          to="/app"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <HomeIcon class="w-4 mr-2" />
          Accueil
        </RouterLink>
      </li>
      <li v-for="(item, index) in breadcrumbItems" :key="item">
        <div class="flex items-center">
          <ChevronRightIcon class="w-4 text-gray-500 dark:text-gray-400" />
          <span
            v-if="index == breadcrumbItems.length - 1"
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
          >
            {{ route.name }}
          </span>
          <RouterLink
            v-else
            :to="item"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ router.getRoutes().find((route) => route.path == item)?.name }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>
