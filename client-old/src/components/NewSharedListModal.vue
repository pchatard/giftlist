<script setup lang="ts">
import type { FormValidation } from "@/types/giftlist";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", sharingCode: string): void;
}>();

const sharingCode = ref("");
const sharingCodeValidation = reactive<FormValidation>({
  isError: false,
  errorMessage: "",
});

const handleSubmit = () => {
  if (validateSharingCode()) {
    const parsedSharingCode = sharingCode.value;
    emit("submit", parsedSharingCode);
    resetForm();
  }
};

const resetForm = () => {
  sharingCode.value = "";
};

const validateSharingCode = (): boolean => {
  if (sharingCode.value.trim() == "") {
    sharingCodeValidation.isError = true;
    sharingCodeValidation.errorMessage =
      "Le lien ou le code ne peut pas être vide";
    return false;
    // } else if (sharingCode.value != "valid") {
    //   sharingCodeValidation.isError = true;
    //   sharingCodeValidation.errorMessage = "Le format est invalide";
    //   return false;
  }
  return true;
};

const handlePaste = (e: ClipboardEvent) => {
  const splitCopiedLink = e.clipboardData?.getData("text").split("/") ?? [];
  const formattedSharingCode = splitCopiedLink[splitCopiedLink.length - 1];
  sharingCode.value = formattedSharingCode;
};
</script>

<template>
  <div
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full bg-gray-400 bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-400 flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-md h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click.stop="$emit('close')"
        >
          <XMarkIcon class="w-5" />
          <span class="sr-only">Fermer</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Lien de partage
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="shared-list-code"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lien de partage
              </label>
              <input
                id="shared-list-code"
                v-model="sharingCode"
                type="text"
                name="shared-list-code"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required
                @paste.prevent="handlePaste"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">
                  {{ sharingCodeValidation.isError ? "Erreur :" : "" }}
                </span>
                {{ sharingCodeValidation.errorMessage }}
              </p>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Le lien ou code de partage se présente sous la forme suivante
                ...
              </p>
            </div>

            <button
              type="button"
              class="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="handleSubmit"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
