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
  { name: "", isMobile: true },
  { name: "Cadeau", isMobile: true },
  { name: "Prix", isMobile: true },
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
            <td class="py-4 px-3 md:px-6">
              <HeartIconSolid v-if="gift.isFavorite" class="w-5 text-red-600" />
            </td>
            <th scope="row" class="py-4 px-3 md:px-6 flex flex-col">
              <span
                class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >{{ gift.title }}</span
              >
              <span class="font-normal text-xs">{{ gift.category }}</span>
            </th>
            <td class="py-4 px-3 md:px-6">
              {{ gift.price?.toFixed(2) ?? "-" }} €
            </td>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ gift.brand ?? "-" }}
            </td>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ gift.size ?? "-" }}
            </td>
            <td class="py-4 px-3 md:px-6">Actions</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
