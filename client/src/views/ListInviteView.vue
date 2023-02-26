<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import { useListsStore } from "@/stores/lists";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const listsStore = useListsStore();
const sharingCode = useRoute().params.sharingCode as string;

onMounted(() => {
  listsStore.requestAccessToSharedList(sharingCode).then(() => {
    // TODO : Redirect to list
  });
});
</script>

<template>
  <div>
    <PageHeading>Invitation</PageHeading>
    <div class="flex flex-col">
      <span>Loader</span>
      <span>Demande d'accès à la liste en cours</span>
    </div>
  </div>
</template>
