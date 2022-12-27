<script setup lang="ts">
import { ref, reactive } from "vue";
import type { List } from "@/types/giftlist";
import { sharedLists as sharedListsData } from "@/data/lists";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  PlusSmallIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const sharedLists = ref<List[]>(sharedListsData);
const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

const listTableHeaders = [
  { name: "Nom de la liste", isMobile: true },
  { name: "Propriétaire(s)", isMobile: true },
  { name: "Date d'échéance", isMobile: false },
  { name: "Actions", isMobile: false },
];

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
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold dark:text-white mb-4">
      Listes partagées avec moi
    </h1>

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
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ list.title }}
            </th>
            <td class="py-4 px-6">
              {{ list.ownersDTO ?? "Copain" }}
            </td>
            <td class="py-4 px-6 hidden md:table-cell">
              {{ list.closureDate }}
            </td>
            <td class="py-4 px-6 hidden md:table-cell">Actions</td>
          </tr>
          <tr
            class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td colspan="100%" class="py-4 px-6">
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
