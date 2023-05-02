<script setup lang="ts">
import {
  onMounted,
  inject,
  reactive,
  watch,
  computed,
  ref,
  onUnmounted,
} from "vue";

import PageHeading from "@/components/PageHeading.vue";
import DeleteListModal from "@/components/DeleteListModal.vue";
import BookGiftModal from "@/components/BookGiftModal.vue";
import GiftOptionsModal from "@/components/GiftOptionsModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  HeartIcon,
  TrashIcon,
  PencilIcon,
  TicketIcon,
  NoSymbolIcon,
  CheckIcon,
  GiftIcon,
  PlusSmallIcon,
  UsersIcon,
  ArchiveBoxXMarkIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalCircleIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
import { useListsStore } from "@/stores/lists";
import { useGiftsStore } from "@/stores/gifts";
import { storeToRefs } from "pinia";
import { giftCategory, type Gift, type ListInfo } from "@/types/giftlist";

// Router
const router = useRouter();
const currentRoute = useRoute();
const listId =
  typeof currentRoute.params.listId == "string"
    ? currentRoute.params.listId
    : currentRoute.params.listId[0];

// Stores and data
const listsStore = useListsStore();
const giftsStore = useGiftsStore();
const { selectedList } = storeToRefs(listsStore);
const { gifts } = storeToRefs(giftsStore);

const list = computed(() => selectedList.value);
// TODO: Edit after ownersIds modifications
const isListOwner = computed(() => selectedList.value?.isOwner);

const listLoading = ref(!list.value?.title);
const giftsLoading = ref(true);

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: isListOwner.value ? "Mes listes" : "Listes partagées",
    path: isListOwner.value ? "/app/lists" : "/app/lists/shared",
  },
  { name: list.value?.title ?? "...", path: currentRoute.fullPath },
]);

// Page content
const showOptions = ref(false);

const ownerTableHeaders = [
  { name: "", key: "favorite", isMobile: true },
  { name: "Cadeau", key: "gift", isMobile: true },
  { name: "Prix", key: "price", isMobile: true },
  { name: "Détails", key: "details", isMobile: false },
  { name: "", key: "actions", isMobile: true },
];

const visitorTableHeaders = [
  { name: "Cadeau", key: "gift", isMobile: true },
  { name: "Prix", key: "price", isMobile: true },
  { name: "Disponibilité", key: "available", isMobile: false },
  { name: "Détails", key: "details", isMobile: false },
  { name: "", key: "actions", isMobile: true },
];

const tableHeaders = computed(() =>
  isListOwner.value ? ownerTableHeaders : visitorTableHeaders
);

const sorting = reactive({
  columnIndex: 0,
  isDown: true,
});

// Modals
const deleteListModal = reactive({
  show: false,
  listInfo: {
    id: "",
    title: "",
  },
  loading: false,
  submitAction: (listId: string) => {
    deleteListModal.loading = true;
    listsStore.deleteList(listId).then(() => {
      deleteListModal.loading = false;
      deleteListModal.show = false;
      deleteListModal.listInfo.id = "";
      deleteListModal.listInfo.title = "";
      router.push("/app/lists" + isListOwner.value ? "" : "/shared");
    });
  },
  closeAction: () => {
    deleteListModal.show = false;
  },
});

const deleteGiftModal = reactive({
  show: false,
  listInfo: {
    id: "",
    title: "",
  },
  loading: false,
  submitAction: (giftId: string) => {
    deleteGiftModal.loading = true;
    giftsStore.deleteGift(listId, giftId).then(() => {
      deleteGiftModal.loading = false;
      deleteGiftModal.show = false;
      deleteGiftModal.listInfo.id = "";
      deleteGiftModal.listInfo.title = "";
    });
  },
  closeAction: () => {
    deleteGiftModal.show = false;
  },
});

const bookGiftModal = reactive({
  show: false,
  giftInfo: {
    id: "",
    title: "",
    isBooked: false,
  },
  loading: false,
  submitAction: (giftId: string) => {
    bookGiftModal.loading = true;
    if (bookGiftModal.giftInfo.isBooked) {
      giftsStore.unbookGift(listId, giftId).then(() => {
        bookGiftModal.loading = false;
        bookGiftModal.show = false;
        bookGiftModal.giftInfo.id = "";
        bookGiftModal.giftInfo.title = "";
        bookGiftModal.giftInfo.isBooked = false;
      });
    } else {
      giftsStore.bookGift(listId, giftId).then(() => {
        bookGiftModal.loading = false;
        bookGiftModal.show = false;
        bookGiftModal.giftInfo.id = "";
        bookGiftModal.giftInfo.title = "";
        bookGiftModal.giftInfo.isBooked = false;
      });
    }
  },
  closeAction: () => {
    bookGiftModal.show = false;
  },
});

const giftOptionsModal = reactive({
  show: false,
  giftInfo: {} as Gift,
  closeAction: function () {
    giftOptionsModal.show = false;
  },
  linkAction: function (link: string) {
    giftOptionsModal.closeAction();
    handleOpenGiftLink(link);
  },
  editAction: function (id: string) {
    giftOptionsModal.closeAction();
    handleGiftClick(id);
  },
  deleteAction: function (id: string) {
    giftOptionsModal.closeAction();
    handleGiftDelete({ id, title: giftOptionsModal.giftInfo.title });
  },
  bookAction: function (id: string) {
    giftOptionsModal.closeAction();
    handleBookGift({
      id,
      title: giftOptionsModal.giftInfo.title,
      isBooked: giftOptionsModal.giftInfo.isBooked ?? false,
    });
  },
  unbookAction: function (id: string) {
    giftOptionsModal.closeAction();
    handleUnbookGift({
      id,
      title: giftOptionsModal.giftInfo.title,
      isBooked: giftOptionsModal.giftInfo.isBooked ?? false,
    });
  },
});

// Handlers
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

const handleGiftFav = (giftId: string) => {
  giftsStore.favGift(listId, giftId);
};

const handleGiftUnfav = (giftId: string) => {
  giftsStore.unfavGift(listId, giftId);
};

const handleGiftClick = (giftId: string) => {
  const destination = isListOwner.value
    ? `/app/lists/${listId}/gift/${giftId}/edit`
    : `/app/lists/${listId}/gift/${giftId}`;
  listsStore.selectList(listId, true);
  giftsStore.selectGift(giftId);
  router.push(destination);
};

const handleGiftDelete = (giftInfo: ListInfo) => {
  if (isListOwner.value) {
    deleteGiftModal.listInfo = giftInfo;
    deleteGiftModal.show = true;
  }
};

const handleBookGift = (giftInfo: ListInfo & { isBooked: boolean }) => {
  if (!isListOwner.value) {
    bookGiftModal.giftInfo = giftInfo;
    bookGiftModal.show = true;
  }
};

const handleUnbookGift = (giftInfo: ListInfo & { isBooked: boolean }) => {
  if (!isListOwner.value) {
    bookGiftModal.giftInfo = giftInfo;
    bookGiftModal.show = true;
  }
};

const handleOpenGiftLink = (giftLink: string | undefined) => {
  if (giftLink) {
    window.open(giftLink, "_blank", "noreferrer");
  }
};

const handleListDelete = (listInfo: ListInfo) => {
  deleteListModal.listInfo = listInfo;
  deleteListModal.show = true;
};

const handleOptionsClick = (gift: Gift) => {
  giftOptionsModal.giftInfo = gift;
  giftOptionsModal.show = true;
};

function categoryName(categoryId: keyof typeof giftCategory | "") {
  return giftCategory[categoryId != "" ? categoryId : "other"];
}

let eventListenerCloseFunction: (e: MouseEvent) => void;

// Initialization
onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
  listsStore
    .getList(listId)
    .then(() => {
      return giftsStore.getGifts(listId);
    })
    .then(() => {
      listLoading.value = false;
      giftsLoading.value = false;
    });

  eventListenerCloseFunction = (e) => {
    const button = document.getElementById("list-options-button");
    const icon = button?.querySelector("list-options-icon");

    if (e.target !== button && e.target !== icon) {
      showOptions.value = false;
    }
  };

  document.addEventListener("click", eventListenerCloseFunction);
});

onUnmounted(() => {
  document.removeEventListener("click", eventListenerCloseFunction);
});

onBeforeRouteLeave((to, from) => {
  // TODO : Reset gifts store if next page is not creation or edit page with onBeforeRouteLeave
  if (
    !to.params ||
    !to.params.listId ||
    to.params.listId != from.params.listId
  ) {
    giftsStore.reset();
  }
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
  <div
    v-if="listLoading"
    class="m-auto w-full md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-270px)] text-gray-400"
  >
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="flex flex-col justify-between mb-4">
      <PageHeading class="flex flex-row justify-between items-center gap-4">
        <span>{{ list?.title }}</span>
        <div class="relative">
          <button
            id="list-options-button"
            class="flex items-center text-primary-600 dark:text-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm self-center px-4 py-2 lg:cursor-pointer dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            @click.stop="showOptions = !showOptions"
          >
            <span class="mr-2 hidden md:inline">Options</span>
            <Cog6ToothIcon
              id="list-options-icon"
              class="w-6 transition-transform hover:rotate-12"
            />
          </button>
          <div
            v-if="showOptions"
            class="z-10 absolute right-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li v-if="isListOwner">
                <RouterLink
                  :to="`${currentRoute.fullPath}/edit`"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Modifier
                </RouterLink>
              </li>
              <li v-if="isListOwner">
                <RouterLink
                  :to="`${currentRoute.fullPath}/share`"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Partager
                </RouterLink>
              </li>
              <li
                class="block px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="
                  handleListDelete({
                    id: list?.id ?? '',
                    title: list?.title ?? '',
                  })
                "
              >
                {{ isListOwner ? "Supprimer" : "Retirer de mes listes" }}
              </li>
            </ul>
          </div>
        </div>
      </PageHeading>

      <div class="-mt-2 flex gap-4">
        <RouterLink
          v-if="isListOwner && list?.isShared"
          :to="`${currentRoute.fullPath}/share`"
          class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
        >
          <UsersIcon class="w-4 mr-2" />
          <span>Partagée</span>
        </RouterLink>
        <RouterLink
          v-else-if="isListOwner && !list?.isShared"
          :to="`${currentRoute.fullPath}/share`"
          class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
        >
          <NoSymbolIcon class="w-4 mr-2" />
          <span>Privée</span>
        </RouterLink>

        <div
          v-if="!isListOwner"
          class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-primary-200 dark:bg-primary-900 text-primary-900 dark:text-primary-200"
        >
          <UsersIcon class="w-4 mr-2" />
          <p>
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
        <div
          v-if="list?.closureDate"
          class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
        >
          <CalendarDaysIcon class="w-4 mr-2" />
          {{ list?.closureDate }}
        </div>

        <button
          v-if="isListOwner"
          type="button"
          class="hidden md:inline-flex text-white w-full md:w-auto md:ml-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center justify-center items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="router.push(`${currentRoute.fullPath}/gift/new`)"
        >
          <span>Nouveau cadeau</span>
          <GiftIcon class="ml-4 -mr-1 w-5 h-5" />
        </button>
      </div>

      <div v-if="isListOwner" class="mt-4 w-full md:hidden">
        <button
          type="button"
          class="text-white w-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center inline-flex justify-center items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="router.push(`${currentRoute.fullPath}/gift/new`)"
        >
          <span>Nouveau cadeau</span>
          <GiftIcon class="ml-4 -mr-1 w-5 h-5" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <DeleteListModal
        v-show="deleteListModal.show"
        :list-info="deleteListModal.listInfo"
        :loading="deleteListModal.loading"
        @close="deleteListModal.closeAction"
        @submit="deleteListModal.submitAction"
      />
      <DeleteListModal
        v-show="deleteGiftModal.show"
        :list-info="deleteGiftModal.listInfo"
        :loading="deleteGiftModal.loading"
        @close="deleteGiftModal.closeAction"
        @submit="deleteGiftModal.submitAction"
      />
      <BookGiftModal
        v-show="bookGiftModal.show"
        :gift-info="bookGiftModal.giftInfo"
        :loading="bookGiftModal.loading"
        @close="bookGiftModal.closeAction"
        @submit="bookGiftModal.submitAction"
      />
      <GiftOptionsModal
        v-show="giftOptionsModal.show"
        :is-list-owner="isListOwner"
        :gift-info="giftOptionsModal.giftInfo"
        @close="giftOptionsModal.closeAction"
        @link="giftOptionsModal.linkAction"
        @edit="giftOptionsModal.editAction"
        @delete="giftOptionsModal.deleteAction"
        @book="giftOptionsModal.bookAction"
        @unbook="giftOptionsModal.unbookAction"
      />
    </Teleport>

    <div
      v-if="giftsLoading"
      class="m-auto md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-270px-0.625rem)] text-gray-400"
    >
      <LoadingSpinner />
    </div>
    <div v-else-if="gifts.length" class="overflow-x-auto relative rounded-lg">
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
                <span
                  class="mr-1 md:cursor-pointer"
                  :class="{ hidden: header.name === 'Actions' }"
                  >{{ header.name }}</span
                >
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
            <td v-if="isListOwner" class="py-4 px-3 w-1/12 md:px-6">
              <HeartIconSolid
                v-if="gift.isFavorite"
                class="w-5 text-red-600 hover:text-red-800"
                @click.stop="handleGiftUnfav(gift.id)"
              />
              <HeartIcon
                v-else
                class="w-5 text-red-600 hover:text-red-800"
                @click.stop="handleGiftFav(gift.id)"
              />
            </td>

            <!-- Column 2: 7/12 (owner) et 8/12 -->
            <th
              scope="row"
              class="relative py-4 px-3 md:w-4/12 md:px-6 max-w-[120px] md:max-w-none"
              :class="{
                'w-7/12': isListOwner,
                'w-8/12': !isListOwner,
              }"
            >
              <HeartIconSolid
                v-if="!isListOwner && gift.isFavorite"
                class="w-4 md:w-5 absolute top-1 left-1 -rotate-12 text-red-600"
              />
              <div
                class="relative font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis dark:text-white"
              >
                {{ gift.title }}
              </div>
              <div class="font-normal text-xs">
                {{ categoryName(gift.category) }}
              </div>
              <div class="font-normal text-xs md:hidden">
                {{ gift.brand }} {{ gift.size ? "- " + gift.size : "" }}
              </div>
            </th>

            <!-- Column 3 : 2/12 (owner) et 3/12 (shared) -->
            <td
              class="py-4 px-3 md:px-6"
              :class="{
                'w-2/12': isListOwner,
                'w-3/12 md:w-2/12': !isListOwner,
              }"
            >
              <div class="flex flex-col gap-1 justify-center">
                <div class="text-sm">
                  {{ gift.price && gift.price > 0 ? gift.price + "€" : "-" }}
                </div>
                <div v-if="!isListOwner" class="md:hidden">
                  <div
                    v-if="gift.isBooked"
                    class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
                  >
                    <NoSymbolIcon class="w-4 mr-1" />
                    <span>Pris</span>
                  </div>
                  <div
                    v-else
                    class="flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
                  >
                    <CheckIcon class="w-4 mr-1" />
                    <span>Dispo</span>
                  </div>
                </div>
              </div>
            </td>

            <!-- Column 4 -->
            <td class="py-4 px-3 hidden md:w-2/12 md:px-6 md:table-cell">
              <!-- Column 4 List owner : Details -->
              <div v-if="isListOwner" class="flex flex-col">
                <div>
                  {{ gift.brand }}
                  {{ gift.size ? "- Taille " + gift.size : "" }}
                </div>
                <div v-if="gift.color">{{ gift.color }}</div>
              </div>
              <!-- Column 4 visitor : Availability -->
              <div v-else>
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
              </div>
            </td>

            <!-- Column 5 -->
            <td
              v-if="!isListOwner"
              class="py-4 px-3 hidden md:w-2/12 md:px-6 md:table-cell"
            >
              <div>
                {{ gift.brand }}
                {{ gift.size ? "- Taille " + gift.size : "" }}
              </div>
              <div v-if="gift.color">{{ gift.color }}</div>
            </td>

            <!-- Column 8: 1/12 (owner) et 1/12 (shared) -->
            <td
              class="py-4 px-3 w-1/12 md:px-6"
              :class="{ 'md:w-3/12': isListOwner, 'md:w-2/12': !isListOwner }"
            >
              <div class="hidden md:flex items-stretch justify-end">
                <button
                  v-if="isListOwner && gift.linkURL"
                  type="button"
                  class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                  @click.stop="handleOpenGiftLink(gift.linkURL)"
                >
                  <ArrowTopRightOnSquareIcon class="w-5" />
                  <span class="hidden lg:inline lg:ml-2">Lien</span>
                </button>
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
                  @click.stop="
                    handleGiftDelete({ id: gift.id, title: gift.title })
                  "
                >
                  <TrashIcon class="w-5" />
                  <span class="hidden lg:inline lg:ml-2">Supprimer</span>
                </button>
                <button
                  v-if="!isListOwner && gift.linkURL"
                  type="button"
                  class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                  @click.stop="handleOpenGiftLink(gift.linkURL)"
                >
                  <ArrowTopRightOnSquareIcon class="w-5" />
                  <span class="hidden md:inline md:ml-2">Lien</span>
                </button>
                <button
                  v-if="!isListOwner && !gift.isBooked"
                  type="button"
                  class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                  @click.stop="
                    handleBookGift({
                      id: gift.id,
                      title: gift.title,
                      isBooked: false,
                    })
                  "
                >
                  <TicketIcon class="w-5" />
                  <span class="hidden md:inline md:ml-2">Réserver</span>
                </button>
                <button
                  v-else-if="!isListOwner && gift.isBooked && gift.isBookedByMe"
                  type="button"
                  class="text-red-600 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-red-300 dark:hover:bg-red-800 dark:focus:ring-red-800"
                  @click.stop="
                    handleUnbookGift({
                      id: gift.id,
                      title: gift.title,
                      isBooked: true,
                    })
                  "
                >
                  <NoSymbolIcon class="w-5" />
                  <span class="hidden md:inline md:ml-2">Annuler</span>
                </button>
              </div>
              <div class="flex md:hidden text-primary-600">
                <button
                  v-if="
                    isListOwner ||
                    !gift.isBooked ||
                    gift.linkURL ||
                    (gift.isBooked && gift.isBookedByMe)
                  "
                  type="button"
                  class="text-primary-600 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-1.5 text-center inline-flex items-center mr-1 lg:mr-2 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
                  @click.stop="handleOptionsClick(gift)"
                >
                  <EllipsisHorizontalCircleIcon class="w-5" />
                  <span class="sr-only">Options</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="m-auto w-full md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-270px-0.625rem)] text-gray-400"
    >
      <div class="flex flex-col items-center justify-center px-4">
        <ArchiveBoxXMarkIcon class="w-1/3" />
        <div v-if="isListOwner" class="text-md text-center md:text-lg">
          Vous n'avez pas encore de cadeaux, créez en un !
        </div>
        <div v-else class="text-md text-center md:text-lg">
          Cette liste ne contient pas de cadeaux !
        </div>
      </div>
      <button
        v-if="isListOwner"
        type="button"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="router.push(`${currentRoute.fullPath}/gift/new`)"
      >
        <span class="">Nouveau cadeau</span>
        <PlusSmallIcon class="ml-2 -mr-1 w-5 h-5" />
      </button>
    </div>
  </div>
</template>
