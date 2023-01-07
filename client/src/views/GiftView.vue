<script setup lang="ts">
import { lists as listsData } from "@/data/lists";
import { gifts as giftsData } from "@/data/gifts";

import type { List, Gift } from "@/types/giftlist";

import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import PageHeading from "@/components/PageHeading.vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

import { TicketIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const list = ref<List>();
const gift = ref<Gift>();

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  setBreadcrumbContent([{ name: route.name ?? "", path: route.fullPath }]);
});

onMounted(() => {
  list.value = listsData.find((l) => l.id == route.params.listId);
  gift.value = giftsData
    .filter((g) => g.listId == route.params.listId)
    .find((g) => g.id == route.params.giftId);
  setBreadcrumbContent([
    { name: "Listes partagées", path: "/app/lists/shared" },
    { name: list.value?.title, path: `/app/lists/${list.value?.id}` },
    { name: gift.value?.title ?? "Mon cadeau", path: route.fullPath },
  ]);
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
        @click.prevent=""
      >
        Réserver
        <TicketIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
      <div v-else>Réservé</div>
    </div>

    <div>
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
