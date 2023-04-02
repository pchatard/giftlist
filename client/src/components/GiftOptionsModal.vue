<script setup lang="ts">
import type { Gift } from "@/types/giftlist";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
  TicketIcon,
  NoSymbolIcon,
} from "@heroicons/vue/24/outline";

export interface GiftOptionsModalProps {
  isListOwner?: boolean;
  giftInfo: Gift;
}

export interface GiftOptionsModalEmits {
  (e: "close"): void;
  (e: "link", giftLink: string): void;
  (e: "edit", giftId: string): void;
  (e: "delete", giftId: string): void;
  (e: "book", giftId: string): void;
  (e: "unbook", giftId: string): void;
}

const props = defineProps<GiftOptionsModalProps>();
const emit = defineEmits<GiftOptionsModalEmits>();

function handleClose() {
  emit("close");
}

function handleLinkClick() {
  if (props.giftInfo.linkURL) {
    emit("link", props.giftInfo.linkURL);
  }
}

function handleEditClick() {
  emit("edit", props.giftInfo.id);
}

function handleDeleteClick() {
  emit("delete", props.giftInfo.id);
}

function handleBookClick() {
  emit("book", props.giftInfo.id);
}

function handleUnbookClick() {
  emit("unbook", props.giftInfo.id);
}
</script>

<template>
  <div
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full bg-gray-400 bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-400 flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    @click.self="handleClose"
  >
    <div class="relative w-full max-w-md h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click.stop="handleClose"
        >
          <XMarkIcon class="w-5" />
          <span class="sr-only">Fermer</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            {{ props.giftInfo?.title }}
          </h3>
          <div class="flex flex-col gap-4">
            <button
              v-if="props.giftInfo.linkURL"
              type="button"
              class="text-primary-800 bg-primary-50 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center relative dark:bg-primary-200 dark:hover:bg-primary-300 dark:focus:ring-primary-800"
              @click.stop="handleLinkClick"
            >
              <ArrowTopRightOnSquareIcon class="w-5 absolute left-2" />
              <span class="lg:inline lg:ml-2">Ouvrir le lien</span>
            </button>
            <button
              v-if="props.isListOwner"
              type="button"
              class="text-primary-800 bg-primary-50 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center relative dark:bg-primary-200 dark:hover:bg-primary-300 dark:focus:ring-primary-800"
              @click.stop="handleEditClick"
            >
              <PencilIcon class="w-5 absolute left-2" />
              <span class="lg:inline lg:ml-2">Modifier</span>
            </button>
            <button
              v-if="props.isListOwner"
              type="button"
              class="text-red-800 bg-red-50 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center relative dark:bg-red-200 dark:hover:bg-red-900 dark:focus:ring-red-800"
              @click.stop="handleDeleteClick"
            >
              <TrashIcon class="w-5 absolute left-2" />
              <span class="lg:inline lg:ml-2">Supprimer</span>
            </button>
            <button
              v-if="!isListOwner && !props.giftInfo.isBooked"
              type="button"
              class="text-primary-800 bg-primary-50 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center relative dark:bg-primary-200 dark:hover:bg-primary-300 dark:focus:ring-primary-800"
              @click.stop="handleBookClick"
            >
              <TicketIcon class="w-5 absolute left-2" />
              <span class="md:inline md:ml-2">Réserver</span>
            </button>
            <button
              v-else-if="!isListOwner && props.giftInfo.isBooked"
              type="button"
              class="text-red-800 bg-red-50 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center relative dark:bg-red-200 dark:hover:bg-red-900 dark:focus:ring-red-800"
              @click.stop="handleUnbookClick"
            >
              <NoSymbolIcon class="w-5 absolute left-2" />
              <span class="md:inline md:ml-2">Annuler ma réservation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
