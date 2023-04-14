<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";

import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import { inject, onMounted } from "vue";
import { RouterLink } from "vue-router";

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  setBreadcrumbContent([]);
});
</script>

<template>
  <div>
    <PageHeading>Home</PageHeading>
    <div class="flex flex-col">
      <RouterLink
        to="/app/lists"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Mes listes
      </RouterLink>
      <RouterLink
        to="/app/lists/shared"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Mes listes partagées
      </RouterLink>
    </div>
  </div>
</template>
