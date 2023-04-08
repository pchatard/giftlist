<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

import PageHeading from "@/components/PageHeading.vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

import { TicketIcon } from "@heroicons/vue/24/outline";
import { useListsStore } from "@/stores/lists";
import { useGiftsStore } from "@/stores/gifts";
import { storeToRefs } from "pinia";

// Router
const route = useRoute();
const listId =
  typeof route.params.listId == "string"
    ? route.params.listId
    : route.params.listId[0];
const giftId =
  typeof route.params.giftId == "string"
    ? route.params.giftId
    : route.params.giftId[0];

// Stores
const listsStore = useListsStore();
const giftsStore = useGiftsStore();
const { selectedList: list } = storeToRefs(listsStore);
const { selectedGift: gift } = storeToRefs(giftsStore);

// Handlers
const handleBookGift = () => {
  giftsStore.bookGift(listId, giftId);
};

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: "Listes partagées",
    path: "/app/lists/shared",
  },
  { name: list.value?.title ?? "Liste partagée", path: "/app/lists/" + listId },
  { name: gift.value?.title ?? "Mon cadeau", path: route.fullPath },
]);

onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
  listsStore
    .getList(listId)
    .then(() => giftsStore.getGift(listId, giftId))
    .then(() => setBreadcrumbContent(initialBreadcrumbContent.value));
});

onBeforeRouteLeave((to, from) => {
  if (
    !to.params ||
    !to.params.listId ||
    to.params.listId != from.params.listId
  ) {
    giftsStore.reset();
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">
        {{ gift?.title }}
      </PageHeading>
      <button
        v-if="!gift?.isBooked"
        type="button"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click.stop="handleBookGift"
      >
        Réserver
        <TicketIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
      <div v-else>Réservé</div>
    </div>

    <div>
      {{ gift }}
      <div>Catégorie : {{ gift?.category }}</div>
      <div>Prix : {{ gift?.price }}</div>
      <div>Marque : {{ gift?.brand }}</div>
      <div>Couleur : {{ gift?.color }}</div>
      <div>Taille : {{ gift?.size }}</div>
      <div>
        Lien :
        <a
          :href="gift?.linkURL ?? ''"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ gift?.linkURL }}
        </a>
      </div>
    </div>
  </div>
</template>
