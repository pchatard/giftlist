<script setup lang="ts">
import { onMounted, ref, inject, onUnmounted, reactive } from "vue";

import PageHeading from "@/components/PageHeading.vue";
import { sharedLists } from "@/data/lists";
import { gifts as giftsData } from "@/data/gifts";
import { useRoute } from "vue-router";
import { currentRouteNameInjectionKey } from "@/injectionSymbols";
import type { CurrentRouteNameData } from "@/types";
import type { List, Gift } from "@/types/giftlist";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  TicketIcon,
  NoSymbolIcon,
  CheckIcon,
} from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";

const isOwner = ref(false);
const route = useRoute();
const { setCurrentRouteName } = inject(
  currentRouteNameInjectionKey
) as CurrentRouteNameData;

const list = ref<List>();
const gifts = ref<Gift[]>();

const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

const tableHeaders = [
  { name: "Cadeau", isMobile: true },
  { name: "Prix", isMobile: false },
  { name: "Statut", isMobile: true },
  { name: "Marque", isMobile: false },
  { name: "Taille", isMobile: false },
  { name: "Actions", isMobile: true },
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

const handleGiftClick = (giftId: string) => {
  //router.push("/app/lists/" + listId);
};

onMounted(() => {
  list.value = sharedLists.find((l) => l.id == route.params.listId);
  gifts.value = giftsData.filter((g) => g.listId == route.params.listId);
  setCurrentRouteName(list.value?.title ?? "Ma liste");
});

onUnmounted(() => {
  setCurrentRouteName("");
});
</script>

<template>
  <div>
    <PageHeading>{{ list?.title }}</PageHeading>

    <div class="overflow-x-auto relative rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th
              v-for="(header, index) in tableHeaders"
              :key="header.name"
              scope="col"
              class=""
              :class="[
                header.isMobile ? '' : 'hidden md:table-cell',
                header.name ? 'py-3 px-3 md:px-6' : '',
              ]"
              @click="(e) => handleTableHeaderClick(e, index)"
            >
              <div class="flex items-center">
                <span class="mr-1 md:cursor-pointer">{{ header.name }}</span>
                <ArrowSmallDownIcon
                  :class="[
                    index == sorting.columnIndex && sorting.isDown
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-200 dark:text-gray-600',
                    header.name ? '' : 'hidden',
                  ]"
                  class="w-3 md:cursor-pointer"
                  @click="(e: MouseEvent) => handleTableHeaderClick(e, index, true)"
                />
                <ArrowSmallUpIcon
                  :class="[
                    index == sorting.columnIndex && !sorting.isDown
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-200 dark:text-gray-600',
                    header.name ? '' : 'hidden',
                  ]"
                  class="w-3 md:cursor-pointer"
                  @click="(e: MouseEvent) => handleTableHeaderClick(e, index, false)"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="gift in gifts"
            :key="gift.id"
            class="bg-white cursor-pointer dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            :class="[gift.isHidden ? 'hidden' : '']"
            @click="handleGiftClick(gift.id)"
          >
            <th scope="row" class="py-4 px-3 md:px-6">
              <div
                class="relative font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <HeartIconSolid
                  v-if="gift.isFavorite"
                  class="w-4 md:w-5 absolute top-0 left-0 -translate-x-2/3 -translate-y-2/3 -rotate-12 text-red-600"
                />
                {{ gift.title }}
              </div>
              <div class="font-normal text-xs">{{ gift.category }}</div>
            </th>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ gift.price?.toFixed(2) ?? "-" }} €
            </td>
            <td class="py-4 px-3 md:px-6">
              <div class="mb-1 md:hidden">
                {{ gift.price?.toFixed(2) ?? "-" }} €
              </div>
              <div
                v-if="gift.isBooked"
                class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
              >
                <NoSymbolIcon class="w-4 mr-2" />
                <span>Réservé</span>
              </div>
              <div
                v-else
                class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900"
              >
                <CheckIcon class="w-4 mr-2" />
                <span>Disponible</span>
              </div>
            </td>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ gift.brand ?? "-" }}
            </td>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ gift.size ?? "-" }}
            </td>
            <td class="py-4 px-3 md:px-6">
              <button
                type="button"
                class="text-blue-600 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-blue-300 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
              >
                <TicketIcon class="w-5" />
                <span class="hidden md:inline md:ml-2">Réserver</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
