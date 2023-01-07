<script setup lang="ts">
import { onMounted, ref, inject, reactive, watch, computed } from "vue";

import PageHeading from "@/components/PageHeading.vue";
import { lists as listsData } from "@/data/lists";
import { gifts as giftsData } from "@/data/gifts";
import { useRoute, useRouter } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  HeartIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  PencilIcon,
  TicketIcon,
  NoSymbolIcon,
  CheckIcon,
  ShareIcon,
  GiftIcon,
  PlusSmallIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";

const router = useRouter();
const currentRoute = useRoute();

// Define this depending on wether the logged in user is in the list owners.
const isListOwner = ref(false);

const list = computed(() =>
  listsData.find((l) => l.id == currentRoute.params.listId)
);
const gifts = computed(() =>
  giftsData.filter((g) => g.listId == currentRoute.params.listId)
);

const ownerTableHeaders = [
  { name: "", key: "favorite", isMobile: true },
  { name: "", key: "hidden", isMobile: false },
  { name: "Cadeau", key: "gift", isMobile: true },
  { name: "Prix", key: "price", isMobile: true },
  { name: "Marque", key: "brand", isMobile: false },
  { name: "Taille", key: "size", isMobile: false },
  { name: "Actions", key: "actions", isMobile: true },
];

const visitorTableHeaders = [
  { name: "Cadeau", key: "gift", isMobile: true },
  { name: "Prix", key: "price", isMobile: false },
  { name: "Disponibilité", key: "available", isMobile: true },
  { name: "Marque", key: "brand", isMobile: false },
  { name: "Taille", key: "size", isMobile: false },
  { name: "Actions", key: "actions", isMobile: true },
];

const tableHeaders = computed(() =>
  isListOwner.value ? ownerTableHeaders : visitorTableHeaders
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

const handleGiftClick = (giftId: string) => {
  const destination = isListOwner.value
    ? `/app/lists/${list.value?.id}/gift/${giftId}/edit`
    : `/app/lists/${list.value?.id}/gift/${giftId}`;
  router.push(destination);
};

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: isListOwner.value ? "Mes listes" : "Listes partagées",
    path: isListOwner.value ? "/app/lists" : "/app/lists/shared",
  },
  { name: list.value?.title ?? "Ma liste", path: currentRoute.fullPath },
]);

onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
});

watch(currentRoute, () => {
  sorting.columnIndex = 0;
  sorting.isDown = true;
});

watch(isListOwner, () => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div>
        <PageHeading class="mb-0 flex items-baseline gap-4">
          <span>{{ list?.title }}</span>
          <button
            v-if="isListOwner"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 lg:cursor-pointer dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            @click="router.push(`/app/lists/${list?.id}/edit`)"
          >
            <PencilIcon class="w-5 text-primary-600" />
          </button>
          <div
            v-if="isListOwner && list?.isShared"
            class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
          >
            <UsersIcon class="w-4 mr-2" />
            <span>Partagée</span>
          </div>
          <div
            v-else-if="isListOwner && !list?.isShared"
            class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
          >
            <NoSymbolIcon class="w-4 mr-2" />
            <span>Privée</span>
          </div>
        </PageHeading>
        <div v-if="isListOwner">
          <p class="text-sm">
            par
            {{
              list?.ownersDTO
                ? list.ownersDTO
                    .map((user) => user.displayName)
                    .reduce(
                      (ownersList, newOwner, index) =>
                        ownersList + (index == 0 ? "" : ", ") + newOwner,
                      "Vous, "
                    )
                : ""
            }}
          </p>
        </div>
        <div v-else>
          <p class="text-sm">
            par
            {{
              list?.ownersDTO
                ? list.ownersDTO
                    .map((user) => user.displayName)
                    .reduce(
                      (ownersList, newOwner, index) =>
                        ownersList + (index == 0 ? "" : ", ") + newOwner,
                      ""
                    )
                : ""
            }}
          </p>
        </div>
        <p v-if="list?.closureDate" class="text-sm">
          Date d'échéance : {{ list?.closureDate }}
        </p>
      </div>
      <div class="flex gap-2">
        <button
          v-if="isListOwner"
          type="button"
          class="hidden text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2 text-center md:inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Partager
          <ShareIcon class="ml-2 -mr-1 w-5 h-5" />
        </button>
        <button
          v-if="isListOwner"
          type="button"
          class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="router.push('/app/lists/' + list?.id + '/gift/new')"
        >
          <span class="hidden sr-only md:not-sr-only md:inline"
            >Nouveau cadeau</span
          >
          <GiftIcon class="w-5 md:ml-2" />
          <PlusSmallIcon class="ml-2 -mr-1 w-5 h-5 md:hidden" />
        </button>
      </div>
    </div>

    <!-- <label for="isOwner" class="mr-2">isListOwner</label>
    <input id="isOwner" v-model="isListOwner" type="checkbox" name="isOwner" /> -->

    <div class="overflow-x-auto relative rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th
              v-for="(header, index) in tableHeaders"
              :key="header.key"
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
            <!-- Column 1 -->
            <td v-if="isListOwner" class="py-4 px-3 md:px-6">
              <HeartIconSolid v-if="gift.isFavorite" class="w-5 text-red-600" />
              <HeartIcon v-else class="w-5 text-red-600" />
            </td>

            <!-- Column 2 -->
            <td
              v-if="isListOwner"
              class="py-4 px-3 md:px-6 hidden md:table-cell"
            >
              <EyeSlashIcon v-if="gift.isHidden" class="w-5" />
              <EyeIcon v-else class="w-5" />
            </td>

            <!-- Column 3 -->
            <th scope="row" class="py-4 px-3 md:px-6 w-full md:w-auto">
              <div
                class="relative font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <HeartIconSolid
                  v-if="!isListOwner && gift.isFavorite"
                  class="w-4 md:w-5 absolute top-0 left-0 -translate-x-2/3 -translate-y-2/3 -rotate-12 text-red-600"
                />
                {{ gift.title }}
              </div>
              <div class="font-normal text-xs">{{ gift.category }}</div>
            </th>

            <!-- Column 4 -->
            <td
              class="py-4 px-3 md:px-6"
              :class="[isListOwner ? '' : 'hidden md:table-cell']"
            >
              {{ gift.price?.toFixed(2) ?? "-" }} €
            </td>

            <!-- Column 5 -->
            <td
              v-if="isListOwner"
              class="py-4 px-3 md:px-6 hidden md:table-cell"
            >
              {{ gift.brand ?? "-" }}
            </td>
            <td v-else class="py-4 px-3 md:px-6">
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
                class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
              >
                <CheckIcon class="w-4 mr-2" />
                <span>Disponible</span>
              </div>
            </td>

            <!-- Column 6 -->
            <td class="py-4 px-3 md:px-6 hidden md:table-cell">
              {{ isListOwner ? gift.size ?? "-" : gift.brand ?? "-" }}
            </td>

            <!-- Column 7 -->
            <td
              v-if="!isListOwner"
              class="py-4 px-3 md:px-6 hidden md:table-cell"
            >
              {{ gift.size ?? "-" }}
            </td>

            <!-- Column 8 -->
            <td class="py-4 px-3 md:px-6">
              <button
                v-if="isListOwner"
                type="button"
                class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                @click.stop="handleGiftClick(gift.id)"
              >
                <PencilIcon class="w-5" />
                <span class="hidden lg:inline lg:ml-2">Modifier</span>
              </button>
              <button
                v-if="isListOwner"
                type="button"
                class="text-red-600 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-red-800"
                @click.stop=""
              >
                <TrashIcon class="w-5" />
                <span class="hidden lg:inline lg:ml-2">Supprimer</span>
              </button>
              <button
                v-if="!isListOwner && !gift.isBooked"
                type="button"
                class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                @click.stop=""
              >
                <TicketIcon class="w-5" />
                <span class="hidden md:inline md:ml-2">Réserver</span>
              </button>
            </td>
          </tr>

          <!-- Action row -->
          <tr
            v-if="isListOwner"
            class="bg-white border-b cursor-pointer dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="router.push('/app/lists/' + list?.id + '/gift/new')"
          >
            <td colspan="100%" class="py-4 px-3 md:px-6">
              <div class="flex items-center justify-center">
                <span>Nouveau cadeau</span>
                <GiftIcon class="w-4 ml-2" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      v-if="isListOwner"
      type="button"
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-3 text-center w-full flex justify-center items-center md:hidden dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Partager
      <ShareIcon class="ml-2 -mr-1 w-5 h-5" />
    </button>
  </div>
</template>
