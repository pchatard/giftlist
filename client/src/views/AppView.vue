<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
</script>

<template>
  <div>
    <PageHeading>App</PageHeading>
    <div>
      <RouterLink
        to="/app/lists"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Mes listes
      </RouterLink>
      <RouterLink
        to="/app/shared"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Mes listes partagées
      </RouterLink>
      <RouterLink
        to="/app/lists/id1"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Ma liste
      </RouterLink>
    </div>
  </div>
</template>
