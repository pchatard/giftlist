<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";

import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import { inject, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const { user } = useAuth0();

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  setBreadcrumbContent([]);
});
</script>

<template>
  <div>
    <PageHeading>Bienvenue {{ user.nickname }}</PageHeading>
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
