<script setup lang="ts">
import { ref } from "vue";
import type { List } from "@/types/giftlist";
import { lists as listsData } from "@/data/lists";

const lists = ref<List[]>(listsData);
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
