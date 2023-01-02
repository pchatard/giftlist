<script setup lang="ts">
import { onMounted, ref, inject, reactive, watch } from "vue";

import PageHeading from "@/components/PageHeading.vue";
import GiftModal from "@/components/GiftModal.vue";
import { lists } from "@/data/lists";
import { gifts as giftsData } from "@/data/gifts";
import { useRoute, useRouter } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import type { List, Gift } from "@/types/giftlist";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  PlusSmallIcon,
  HeartIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";

const router = useRouter();
const route = useRoute();

const list = ref<List>();
const gifts = ref<Gift[]>();

const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

const tableHeaders = [
  { name: "", isMobile: true },
  { name: "", isMobile: false },
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
  router.push(`/app/lists/${list.value?.id}/gift/${giftId}/edit`);
};

const isNewGiftModalOpen = ref(route.fullPath.endsWith("/gift/new"));

const handleNewGiftSubmit = () => {
  router.push("/app/lists/" + list.value?.id);
};

const { setBreadcrumbContent, pushBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  list.value = lists.find((l) => l.id == route.params.listId);
  gifts.value = giftsData.filter((g) => g.listId == route.params.listId);
  setBreadcrumbContent([
    { name: "Mes listes", path: "/app/lists" },
    { name: list.value?.title ?? "Ma liste", path: route.fullPath },
  ]);
});

watch(route, (currentRoute) => {
  const isNewGiftPage = currentRoute.fullPath.endsWith("/gift/new");
  const isEditGiftPage = currentRoute.fullPath.endsWith("/edit");
  isNewGiftModalOpen.value = isNewGiftPage || isEditGiftPage;

  if (isNewGiftPage) {
    pushBreadcrumbContent({ name: route.name ?? "", path: route.fullPath });
  } else if (isEditGiftPage) {
    pushBreadcrumbContent({ name: route.name ?? "", path: route.fullPath });
  } else {
    setBreadcrumbContent([
      { name: "Mes listes", path: "/app/lists" },
      { name: list.value?.title ?? "Ma liste", path: route.fullPath },
    ]);
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">{{ list?.title }}</PageHeading>
      <button
        type="button"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="router.push('/app/lists/' + list?.id + '/gift/new')"
      >
        Nouveau cadeau

        <PlusSmallIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
    </div>

    <Teleport to="body">
      <GiftModal
        v-show="isNewGiftModalOpen"
        @close="router.push('/app/lists/' + list?.id)"
        @submit="handleNewGiftSubmit"
      />
    </Teleport>

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
            @click="handleGiftClick(gift.id)"
          >
            <td class="py-4 px-3 md:px-6">
              <HeartIconSolid v-if="gift.isFavorite" class="w-5 text-red-600" />
              <HeartIcon v-else class="w-5 text-red-600" />
            </td>
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              <EyeSlashIcon v-if="gift.isHidden" class="w-5" />
              <EyeIcon v-else class="w-5" />
            </td>
            <th scope="row" class="py-4 px-3 md:px-6 w-full md:w-auto">
              <div
                class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ gift.title }}
              </div>
              <div class="font-normal text-xs">{{ gift.category }}</div>
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
            <td class="py-4 px-3 md:px-6">
              <button
                type="button"
                class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                @click.stop="handleGiftClick(gift.id)"
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
          <tr
            class="bg-white border-b cursor-pointer dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="router.push('/app/lists/' + list?.id + '/gift/new')"
          >
            <td colspan="100%" class="py-4 px-3 md:px-6">
              <div class="flex items-center justify-center">
                <PlusSmallIcon class="w-4 mr-2" />
                <span>Nouveau cadeau</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
