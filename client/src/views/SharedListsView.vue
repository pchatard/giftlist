<script setup lang="ts">
import { ref, reactive, watch, inject, onMounted } from "vue";
import type { List } from "@/types/giftlist";
import { sharedLists as sharedListsData } from "@/data/lists";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import PageHeading from "@/components/PageHeading.vue";
import NewSharedListModal from "@/components/NewSharedListModal.vue";
import { useRoute, useRouter } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

const router = useRouter();
const route = useRoute();

const sharedLists = ref<List[]>(sharedListsData);
const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

const listTableHeaders = [
  { name: "Liste", isMobile: true },
  { name: "Propriétaire(s)", isMobile: false },
  { name: "Date d'échéance", isMobile: false },
  { name: "Actions", isMobile: true },
];

const { setBreadcrumbContent, pushBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

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
  router.push("/app/shared/" + listId);
};

const isNewSharedListModalOpen = ref(route.fullPath.endsWith("/shared/new"));

const handleNewSharedListSubmit = () => {
  router.push("/app/shared");
};

watch(route, (currentRoute) => {
  const isNewSharedList = currentRoute.fullPath.endsWith("/shared/new");
  isNewSharedListModalOpen.value = isNewSharedList;

  if (isNewSharedList) {
    pushBreadcrumbContent({ name: route.name ?? "", path: route.fullPath });
  } else {
    setBreadcrumbContent([{ name: route.name ?? "", path: route.fullPath }]);
  }
});

onMounted(() => {
  setBreadcrumbContent([{ name: route.name ?? "", path: route.fullPath }]);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">Listes partagées</PageHeading>
      <button
        type="button"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="router.push('/app/shared/new')"
      >
        Code
        <PlusSmallIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
    </div>

    <Teleport to="body">
      <NewSharedListModal
        v-show="isNewSharedListModalOpen"
        @close="router.push('/app/shared')"
        @submit="handleNewSharedListSubmit"
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
              v-for="(header, index) in listTableHeaders"
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
            v-for="list in sharedLists"
            :key="list.id"
            class="bg-white cursor-pointer dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="handleListClick(list.id)"
          >
            <th scope="row" class="py-4 px-6 w-full md:w-auto">
              <div
                class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ list.title }}
              </div>
              <div class="font-normal md:hidden">
                {{ list.ownersDTO ?? "Copain" }}
              </div>
            </th>
            <td class="py-4 px-6 hidden md:table-cell">
              {{ list.ownersDTO ?? "Copain" }}
            </td>
            <td class="py-4 px-6 hidden md:table-cell">
              {{ list.closureDate }}
            </td>
            <td class="py-4 px-6">
              <button
                type="button"
                class="text-red-600 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-red-800"
                @click.stop=""
              >
                <TrashIcon class="w-4" />
                <span class="hidden lg:inline lg:ml-2">Supprimer</span>
              </button>
            </td>
          </tr>
          <tr
            class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              colspan="100%"
              class="py-4 px-6 cursor-pointer"
              @click="router.push('/app/shared/new')"
            >
              <div class="flex items-center justify-center">
                <PlusSmallIcon class="w-4 mr-2" />
                <span>Entrer un code de partage</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
