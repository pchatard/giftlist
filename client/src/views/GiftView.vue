<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

import PageHeading from "@/components/PageHeading.vue";
import BookGiftModal from "@/components/BookGiftModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorInfo from "@/components/ErrorInfo.vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";

import {
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  BookOpenIcon,
  CpuChipIcon,
  GiftIcon,
  GlobeEuropeAfricaIcon,
  HomeModernIcon,
  MusicalNoteIcon,
  ShoppingBagIcon,
  TicketIcon,
  NoSymbolIcon,
  CheckIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  CubeTransparentIcon,
} from "@heroicons/vue/24/outline";
import { useListsStore } from "@/stores/lists";
import { useGiftsStore } from "@/stores/gifts";
import { storeToRefs } from "pinia";
import { HeartIcon } from "@heroicons/vue/24/solid";
import { giftCategory } from "@/types/giftlist";

// Router
const route = useRoute();
const listId =
  typeof route.params.listId == "string"
    ? route.params.listId
    : route.params.listId[0];
const giftId =
  typeof route.params.giftId == "string"
    ? route.params.giftId
    : route.params.giftId[0];

// Stores
const listsStore = useListsStore();
const giftsStore = useGiftsStore();
const { selectedList: list } = storeToRefs(listsStore);
const { selectedGift: gift } = storeToRefs(giftsStore);

const loading = ref(!gift.value);
const defaultErrorMessage = "Vous n'êtes pas autorisé à consulter cette page.";
const errorMessage = ref(list.value?.isOwner ? defaultErrorMessage : "");
const errorRedirection = ref({
  name: list.value?.title ?? "Ma liste",
  path: "/app/lists/" + listId,
});

// Computed
const categoryName = computed(() => {
  return giftCategory[gift.value?.category || "other"];
});

// Handlers
function handleBookGift() {
  bookGiftModal.giftInfo.isBooked = false;
  bookGiftModal.show = true;
}

function handleUnbookGift() {
  bookGiftModal.giftInfo.isBooked = true;
  bookGiftModal.show = true;
}

const bookGiftModal = reactive({
  show: false,
  giftInfo: {
    id: gift.value?.id ?? "",
    title: gift.value?.title ?? "",
    isBooked: gift.value?.isBooked ?? false,
  },
  loading: false,
  submitAction: (giftId: string) => {
    bookGiftModal.loading = true;
    if (bookGiftModal.giftInfo.isBooked) {
      giftsStore.unbookGift(listId, giftId).then(() => {
        bookGiftModal.loading = false;
        bookGiftModal.show = false;
        bookGiftModal.giftInfo.isBooked = false;
      });
    } else {
      giftsStore.bookGift(listId, giftId).then(() => {
        bookGiftModal.loading = false;
        bookGiftModal.show = false;
      });
    }
  },
  closeAction: () => {
    bookGiftModal.show = false;
  },
});

function handleLinkClick() {
  if (gift.value?.linkURL) {
    window.open(gift.value?.linkURL, "_blank", "noreferrer");
  }
}

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: "Listes partagées",
    path: "/app/lists/shared",
  },
  { name: list.value?.title ?? "...", path: "/app/lists/" + listId },
  { name: gift.value?.title ?? "...", path: route.fullPath },
]);

onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
  listsStore
    .getList(listId)
    .then(() => {
      if (list.value?.isOwner) {
        errorRedirection.value.name = list.value.title ?? "Ma liste";
        throw new Error(defaultErrorMessage);
      }
      return giftsStore.getGift(listId, giftId);
    })
    .catch((error: Error) => {
      errorMessage.value = error.message;
    })
    .then(() => {
      setBreadcrumbContent(initialBreadcrumbContent.value);
    })
    .then(() => {
      loading.value = false;
    });
});

onBeforeRouteLeave((to, from) => {
  if (
    !to.params ||
    !to.params.listId ||
    to.params.listId != from.params.listId
  ) {
    giftsStore.reset();
  }
});
</script>

<template>
  <div
    v-if="loading"
    class="m-auto w-full md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-270px)] text-gray-400"
  >
    <LoadingSpinner />
  </div>
  <div
    v-else-if="errorMessage"
    class="m-auto w-full md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-270px)] text-gray-400"
  >
    <ErrorInfo
      :message="errorMessage"
      :redirection="errorRedirection"
      @redirect="
        () => {
          $router.push(errorRedirection.path);
        }
      "
    />
  </div>
  <div v-else>
    <div class="flex justify-between items-center mb-2">
      <PageHeading class="w-full flex flex-row justify-between items-center">
        <span>
          {{ gift?.title }}
        </span>
      </PageHeading>
    </div>

    <Teleport to="body">
      <BookGiftModal
        v-show="bookGiftModal.show"
        :gift-info="bookGiftModal.giftInfo"
        :loading="bookGiftModal.loading"
        @close="bookGiftModal.closeAction"
        @submit="bookGiftModal.submitAction"
      />
    </Teleport>

    <div class="flex flex-col gap-6 md:gap-12">
      <div class="flex gap-6 md:gap-12">
        <div
          class="relative w-1/3 md:w-1/6 aspect-square rounded-md bg-primary-50 flex flex-col justify-center items-center"
        >
          <span>
            <MusicalNoteIcon
              v-if="gift?.category == 'concerts'"
              class="w-8 text-primary-800"
            />
            <ShoppingBagIcon
              v-if="gift?.category == 'clothes' || gift?.category == 'shoes'"
              class="w-8 text-primary-800"
            />
            <HomeModernIcon
              v-if="gift?.category == 'furniture'"
              class="w-8 text-primary-800"
            />
            <GlobeEuropeAfricaIcon
              v-if="gift?.category == 'experience'"
              class="w-8 text-primary-800"
            />
            <BanknotesIcon
              v-if="gift?.category == 'money'"
              class="w-8 text-primary-800"
            />
            <BookOpenIcon
              v-if="gift?.category == 'books'"
              class="w-8 text-primary-800"
            />
            <CpuChipIcon
              v-if="gift?.category == 'tech'"
              class="w-8 text-primary-800"
            />
            <SparklesIcon
              v-if="gift?.category == 'jewels'"
              class="w-8 text-primary-800"
            />
            <PuzzlePieceIcon
              v-if="gift?.category == 'entertainment'"
              class="w-8 text-primary-800"
            />
            <GiftIcon
              v-if="gift?.category == 'other' || gift?.category == ''"
              class="w-8 text-primary-800"
            />
            <CubeTransparentIcon
              v-if="gift?.category == 'toys'"
              class="w-8 text-primary-800"
            />
          </span>
          <HeartIcon
            v-if="gift?.isFavorite"
            class="absolute w-6 right-0 top-0 translate-x-1/3 -translate-y-1/3 rotate-12 text-red-600"
          />
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex justify-between items-start">
            <div class="flex flex-col">
              <span class="font-bold">Prix</span>
              <span>{{ gift?.price != 0 ? gift?.price + " €" : "-" }}</span>
            </div>
            <div
              v-if="gift?.isBooked"
              class="md:hidden flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
            >
              <NoSymbolIcon class="w-4 mr-2" />
              <span>Réservé</span>
            </div>
            <div
              v-else
              class="md:hidden flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
            >
              <CheckIcon class="w-4 mr-2" />
              <span>Disponible</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Catégorie</span>
            <span>{{ categoryName }}</span>
          </div>
          <div
            v-if="gift?.isBooked"
            class="hidden md:flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200"
          >
            <NoSymbolIcon class="w-4 mr-2" />
            <span>Réservé</span>
          </div>
          <div
            v-else
            class="hidden md:flex items-center px-2 py-1 text-xs text-center w-fit rounded-full bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200"
          >
            <CheckIcon class="w-4 mr-2" />
            <span>Disponible</span>
          </div>
        </div>
        <div class="hidden md:flex md:flex-1 flex-col justify-evenly">
          <button
            v-if="gift?.linkURL"
            type="button"
            class="w-full text-primary-800 bg-primary-50 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 text-center relative dark:bg-primary-200 dark:hover:bg-primary-300 dark:focus:ring-primary-800"
            @click.stop="handleLinkClick"
          >
            <ArrowTopRightOnSquareIcon class="w-5 absolute left-4" />
            <span class="lg:inline lg:ml-2">Ouvrir le lien</span>
          </button>
          <button
            v-if="!gift?.isBooked"
            type="button"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex justify-center items-center relative dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click.stop="handleBookGift"
          >
            <TicketIcon class="absolute left-4 w-5 h-5" />
            Réserver
          </button>
          <button
            v-else-if="gift?.isBooked && gift?.isBookedByMe"
            type="button"
            class="text-red-800 bg-red-50 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center relative dark:bg-red-200 dark:hover:bg-red-900 dark:focus:ring-red-800"
            @click.stop="handleUnbookGift"
          >
            <NoSymbolIcon class="w-5 absolute left-4" />
            <span class="md:inline md:ml-2">Annuler ma réservation</span>
          </button>
          <button
            v-else-if="gift?.isBooked && !gift?.isBookedByMe"
            type="button"
            disabled
            class="text-gray-800 bg-gray-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 text-center relative dark:bg-gray-200 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
          >
            <NoSymbolIcon class="w-5 absolute left-4" />
            <span class="md:inline md:ml-2">Réservé</span>
          </button>
        </div>
      </div>

      <button
        v-if="gift?.linkURL"
        type="button"
        class="w-full md:hidden text-primary-800 bg-primary-50 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 text-center relative dark:bg-primary-200 dark:hover:bg-primary-300 dark:focus:ring-primary-800"
        @click.stop="handleLinkClick"
      >
        <ArrowTopRightOnSquareIcon class="w-5 absolute left-4" />
        <span class="lg:inline lg:ml-2">Ouvrir le lien</span>
      </button>

      <div class="flex gap-12">
        <div class="flex flex-col justify-between md:w-1/6 gap-4">
          <div class="flex flex-col">
            <span class="font-bold">Marque</span>
            <span>{{ gift?.brand || "-" }}</span>
          </div>

          <div class="flex flex-col">
            <span class="font-bold">Taille</span>
            <span>{{ gift?.size || "-" }}</span>
          </div>

          <div class="flex flex-col">
            <span class="font-bold">Couleur</span>
            <span>{{ gift?.color || "-" }}</span>
          </div>

          <div class="flex flex-col md:hidden">
            <span class="font-bold">Commentaire</span>
            <span>{{ gift?.comments || "-" }}</span>
          </div>
        </div>
        <div>
          <div class="hidden flex-col md:flex">
            <span class="font-bold">Commentaire</span>
            <span>{{ gift?.comments || "-" }}</span>
          </div>
        </div>
      </div>

      <button
        v-if="!gift?.isBooked"
        type="button"
        class="md:hidden text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-3 text-center inline-flex justify-center items-center relative dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click.stop="handleBookGift"
      >
        <TicketIcon class="absolute left-4 w-5 h-5" />
        Réserver
      </button>
      <button
        v-else-if="gift?.isBooked && gift?.isBookedByMe"
        type="button"
        class="md:hidden text-red-800 bg-red-50 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-3 text-center relative dark:bg-red-200 dark:hover:bg-red-900 dark:focus:ring-red-800"
        @click.stop="handleUnbookGift"
      >
        <NoSymbolIcon class="w-5 absolute left-4" />
        <span class="md:inline md:ml-2">Annuler ma réservation</span>
      </button>
      <button
        v-else-if="gift?.isBooked && !gift?.isBookedByMe"
        type="button"
        disabled
        class="md:hidden text-gray-800 bg-gray-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-3 text-center relative dark:bg-gray-200 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
      >
        <NoSymbolIcon class="w-5 absolute left-4" />
        <span class="md:inline md:ml-2">Réservé</span>
      </button>
    </div>
  </div>
</template>
