<script setup lang="ts">
import { reactive, watch, onMounted, inject, computed } from "vue";
import { lists as listsData } from "@/data/lists";
import { PlusSmallIcon } from "@heroicons/vue/24/outline";
import PageHeading from "@/components/PageHeading.vue";
import NewSharedListModal from "@/components/NewSharedListModal.vue";
import { useRoute, useRouter } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

import ListsTable from "@/components/ListsTable.vue";

const router = useRouter();
const currentRoute = useRoute();

const { setBreadcrumbContent, pushBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const isSharedView = computed(() => currentRoute.fullPath.includes("/shared"));

const pageTitle = computed(() => {
  return isSharedView.value ? "Listes partagées" : "Mes listes";
});

const headingButton = computed(() => {
  return {
    text: isSharedView.value ? "Code" : "Nouvelle liste",
    action: () =>
      router.push(
        isSharedView.value ? "/app/lists/shared/new" : "/app/lists/new"
      ),
  };
});

const newSharedListModal = {
  show: computed(() => currentRoute.fullPath.endsWith("/shared/new")),
  submitAction: (sharingCode: string) => {
    console.log("Entered new sharing code or link: ", sharingCode);
    router.push("/app/lists/shared");
  },
  closeAction: () => {
    router.push("/app/lists/shared");
  },
};

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

const tableHeaders = computed(() =>
  isSharedView.value ? sharedListTableHeaders : listTableHeaders
);
const lists = computed(() =>
  listsData.filter((list) => (isSharedView.value ? list.isShared : true))
);

const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

const handleTableHeaderClick = (
  e: Event,
  index: number,
  isDown: string | boolean = ""
) => {
  e.stopPropagation();
  if (index == sorting.columnIndex) {
    sorting.isDown = !sorting.isDown;
  } else {
    sorting.columnIndex = index;
    sorting.isDown = typeof isDown === "boolean" ? isDown : true;
  }
};

const handleListClick = (listId: string) => {
  router.push("/app/lists/" + listId);
};

onMounted(() => {
  setBreadcrumbContent([
    { name: currentRoute.name ?? "", path: currentRoute.fullPath },
  ]);
});

watch(currentRoute, (currentRoute) => {
  if (newSharedListModal.show.value) {
    pushBreadcrumbContent({
      name: currentRoute.name ?? "",
      path: currentRoute.fullPath,
    });
  } else {
    setBreadcrumbContent([
      { name: currentRoute.name ?? "", path: currentRoute.fullPath },
    ]);
  }

  sorting.columnIndex = 0;
  sorting.isDown = true;
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">{{ pageTitle }}</PageHeading>
      <button
        type="button"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="headingButton.action"
      >
        {{ headingButton.text }}
        <PlusSmallIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
    </div>

    <Teleport to="body">
      <NewSharedListModal
        v-show="newSharedListModal.show.value && isSharedView"
        @close="newSharedListModal.closeAction"
        @submit="newSharedListModal.submitAction"
      />
    </Teleport>

    <ListsTable
      :table-headers="tableHeaders"
      :sorting="sorting"
      :lists="lists"
      :handle-list-click="handleListClick"
      :handle-table-header-click="handleTableHeaderClick"
      :is-shared-view="isSharedView"
      :last-row-action="headingButton.action"
    />
  </div>
</template>
