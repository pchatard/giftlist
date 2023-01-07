<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import ListsTable from "@/components/ListsTable.vue";

import { lists as listsData } from "@/data/lists";

import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import { computed, inject, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const router = useRouter();

const numberOfListsToShow = ref(1);

const lists = computed(() => listsData.slice(0, numberOfListsToShow.value));
const sharedLists = computed(() =>
  listsData.filter((list) => list.isShared).slice(0, numberOfListsToShow.value)
);

const listTableHeaders = [
  { name: "Liste", isMobile: true },
  { name: "Statut", isMobile: false },
  { name: "Propriétaire(s)", isMobile: false },
  { name: "Date d'échéance", isMobile: false },
  { name: "Actions", isMobile: true },
];
const sharedListTableHeaders = [
  { name: "Liste", isMobile: true },
  { name: "Propriétaire(s)", isMobile: false },
  { name: "Date d'échéance", isMobile: false },
  { name: "Actions", isMobile: true },
];
const handleListClick = (listId: string) => {
  router.push("/app/lists/" + listId);
};

const listLastRowText = computed(() => {
  const otherLists = listsData.length - numberOfListsToShow.value;
  return `${otherLists} autre${otherLists == 1 ? "" : "s"} liste${
    otherLists == 1 ? "" : "s"
  }`;
});

const sharedListLastRowText = computed(() => {
  const otherLists =
    listsData.filter((list) => list.isShared).length -
    numberOfListsToShow.value;
  return `${otherLists} autre${otherLists == 1 ? "" : "s"} liste${
    otherLists == 1 ? "" : "s"
  } partagée${otherLists == 1 ? "" : "s"}`;
});

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  setBreadcrumbContent([]);
  console.log(lists);
});
</script>

<template>
  <div>
    <PageHeading>Bienvenue Dev Loper</PageHeading>
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-4"
        >
          <h2 class="text-xl md:text-2xl font-bold dark:text-white">
            Mes listes
          </h2>
          <RouterLink
            to="/app/lists"
            class="font-medium flex items-center text-blue-600 dark:text-blue-500 hover:underline"
          >
            Voir toutes mes listes
            <ArrowRightIcon class="w-4 ml-2" />
          </RouterLink>
        </div>
        <ListsTable
          :is-shared-view="false"
          :table-headers="listTableHeaders"
          :handle-list-click="handleListClick"
          :lists="lists"
          :last-row-action="() => router.push('/app/lists')"
          :last-row-text="listLastRowText"
        />
      </div>

      <div class="flex flex-col mt-8 gap-4">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-4"
        >
          <h2 class="text-xl md:text-2xl font-bold dark:text-white">
            Mes listes partagées
          </h2>
          <RouterLink
            to="/app/lists/shared"
            class="font-medium flex items-center text-blue-600 dark:text-blue-500 hover:underline"
          >
            Voir toutes les listes partagées avec moi
            <ArrowRightIcon class="w-4 ml-2" />
          </RouterLink>
        </div>
        <ListsTable
          :is-shared-view="true"
          :table-headers="sharedListTableHeaders"
          :handle-list-click="handleListClick"
          :lists="sharedLists"
          :last-row-action="() => router.push('/app/lists/shared')"
          :last-row-text="sharedListLastRowText"
        />
      </div>
    </div>
  </div>
</template>
