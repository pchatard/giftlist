<script setup lang="ts">
import type { TableHeader, TableSorting } from "@/types";
import type { List } from "@/types/giftlist";
import { useRouter } from "vue-router";

import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  UsersIcon,
  NoSymbolIcon,
  PlusSmallIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import { computed } from "vue";

export interface ListsTableProps {
  tableHeaders: TableHeader[];
  handleTableHeaderClick?: (
    e: Event,
    index: number,
    isDown?: string | boolean
  ) => void;
  sorting?: TableSorting;
  lists: List[];
  isSharedView: boolean;
  handleListClick: (listId: string) => void;
  lastRowAction?: () => void;
  lastRowText?: string;
}

const props = defineProps<ListsTableProps>();

const router = useRouter();

const handleTableHeaderClick = (
  e: MouseEvent,
  index: number,
  isDown: string | boolean = ""
) => {
  if (props.sorting && props.handleTableHeaderClick) {
    props.handleTableHeaderClick(e, index, isDown);
  }
};

const computedLastRowText = computed(() => {
  if (props.lastRowText && props.lastRowAction) {
    return props.lastRowText;
  } else {
    return props.isSharedView ? "Entrer un code de partage" : "Nouvelle liste";
  }
});
</script>

<template>
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
                v-if="sorting"
                :class="
                  index == sorting.columnIndex && sorting.isDown
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-200 dark:text-gray-600'
                "
                class="w-3 md:cursor-pointer"
                @click="(e: MouseEvent) => handleTableHeaderClick(e, index, true)"
              />
              <ArrowSmallUpIcon
                v-if="sorting"
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
            <div v-if="!isSharedView" class="mt-1 -ml-1 font-normal md:hidden">
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
            {{
              list?.ownersDTO
                ? list.ownersDTO
                    .map((user) => user.displayName)
                    .reduce(
                      (ownersList, newOwner, index) =>
                        ownersList + (index == 0 ? "" : ", ") + newOwner,
                      ""
                    )
                : null ?? "Copain"
            }}
          </td>

          <!-- Column 3 -->
          <td v-if="!isSharedView" class="py-4 px-6 hidden md:table-cell">
            {{
              list?.ownersDTO
                ? list.ownersDTO
                    .map((user) => user.displayName)
                    .reduce(
                      (ownersList, newOwner, index) =>
                        ownersList + (index == 0 ? "" : ", ") + newOwner,
                      ""
                    )
                : null ?? "Moi"
            }}
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
              @click.stop="router.push(`/app/lists/${list.id}/edit`)"
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
          v-if="lastRowAction"
          class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td
            colspan="100%"
            class="py-4 px-6 cursor-pointer"
            @click="lastRowAction"
          >
            <div class="flex items-center justify-center">
              <PlusSmallIcon class="w-4 mr-2" />
              <span>{{ computedLastRowText }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
