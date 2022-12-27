<script setup lang="ts">
import { ref } from "vue";
import type { List } from "@/types/giftlist";

const lists = ref<List[]>([]);
for (let i = 0; i < 6; i++) {
  lists.value.push({
    id: "id" + i,
    title: "List n°" + i + 1,
    sharingCode: "id" + i,
    isShared: i % 2 == 0,
    description: i % 3 == 0 ? "List n°" + i + " description" : undefined,
  });
}
</script>

<template>
  <div>
    <h1>Mes listes</h1>
    <a href="https://flowbite.com/docs/components/tables/#default-table">
      Flowbite Tables
    </a>
    <ol>
      <li>Test</li>
      <li></li>
      <li></li>
    </ol>
    <p>
      Use Default tables, hover state, sortable head, checkbox selection, modal
    </p>
    {{ lists }}
  </div>
</template>
