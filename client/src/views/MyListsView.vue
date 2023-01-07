<script setup lang="ts">
import { reactive, watch, onMounted, inject, computed } from "vue";
import { lists as listsData } from "@/data/lists";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  UsersIcon,
  NoSymbolIcon,
  PlusSmallIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import PageHeading from "@/components/PageHeading.vue";
import NewSharedListModal from "@/components/NewSharedListModal.vue";
import { useRoute, useRouter } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

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

    <div class="overflow-x-auto relative rounded-lg">
      <table
        class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th
              v-for="(header, index) in tableHeaders"
              :key="header.name"
              scope="col"
              class="py-3 px-6"
              :class="[header.isMobile ? '' : 'hidden md:table-cell']"
              @click="(e) => handleTableHeaderClick(e, index)"
            >
              <div class="flex items-center">
                <span class="mr-1 md:cursor-pointer">{{ header.name }}</span>
                <ArrowSmallDownIcon
                  :class="
                    index == sorting.columnIndex && sorting.isDown
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-200 dark:text-gray-600'
                  "
                  class="w-3 md:cursor-pointer"
                  @click="(e: MouseEvent) => handleTableHeaderClick(e, index, true)"
                />
                <ArrowSmallUpIcon
                  :class="
                    index == sorting.columnIndex && !sorting.isDown
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-200 dark:text-gray-600'
                  "
                  class="w-3 md:cursor-pointer"
                  @click="(e: MouseEvent) => handleTableHeaderClick(e, index, false)"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="list in lists"
            :key="list.id"
            class="bg-white cursor-pointer dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="handleListClick(list.id)"
          >
            <!-- Column 1 -->
            <th scope="row" class="py-4 px-6 w-full md:w-auto">
              <div
                class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ list.title }}
              </div>
              <div
                v-if="!isSharedView"
                class="mt-1 -ml-1 font-normal md:hidden"
              >
                <div
                  v-if="list.isShared"
                  class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
                >
                  <UsersIcon class="w-4 mr-2" />
                  <span>Partagée</span>
                </div>
                <div
                  v-else
                  class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
                >
                  <NoSymbolIcon class="w-4 mr-2" />
                  <span>Privée</span>
                </div>
              </div>
              <div v-else class="font-normal md:hidden">
                {{ list.ownersDTO ?? "Copain" }}
              </div>
            </th>

            <!-- Column 2 -->
            <td v-if="!isSharedView" class="py-4 px-6 hidden md:table-cell">
              <div
                v-if="list.isShared"
                class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
              >
                <UsersIcon class="w-4 mr-2" />
                <span>Partagée</span>
              </div>
              <div
                v-else
                class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
              >
                <NoSymbolIcon class="w-4 mr-2" />
                <span>Privée</span>
              </div>
            </td>
            <td v-else class="py-4 px-6 hidden md:table-cell">
              {{ list.ownersDTO ?? "Copain" }}
            </td>

            <!-- Column 3 -->
            <td v-if="!isSharedView" class="py-4 px-6 hidden md:table-cell">
              {{ list.ownersDTO ?? "Moi" }}
            </td>
            <td v-else class="py-4 px-6 hidden md:table-cell">
              {{ list.closureDate }}
            </td>

            <!-- Column 4 -->
            <td v-if="!isSharedView" class="py-4 px-6 hidden md:table-cell">
              {{ list.closureDate }}
            </td>
            <td v-else class="py-4 px-6">
              <button
                type="button"
                class="text-red-600 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-red-800"
                @click.stop=""
              >
                <TrashIcon class="w-4" />
                <span class="hidden lg:inline lg:ml-2">Supprimer</span>
              </button>
            </td>

            <!-- Column 5 -->
            <td v-if="!isSharedView" class="py-4 px-6">
              <button
                type="button"
                class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                @click.stop=""
              >
                <PencilIcon class="w-5" />
                <span class="hidden lg:inline lg:ml-2">Modifier</span>
              </button>
              <button
                type="button"
                class="text-red-600 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-red-800"
                @click.stop=""
              >
                <TrashIcon class="w-5" />
                <span class="hidden lg:inline lg:ml-2">Supprimer</span>
              </button>
            </td>
          </tr>

          <!-- Action row -->
          <tr
            class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              colspan="100%"
              class="py-4 px-6 cursor-pointer"
              @click="headingButton.action"
            >
              <div class="flex items-center justify-center">
                <PlusSmallIcon class="w-4 mr-2" />
                <span>{{
                  isSharedView ? "Entrer un code de partage" : "Nouvelle liste"
                }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
