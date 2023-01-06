<script setup lang="ts">
import type { FormList, FormListValidation } from "@/types/giftlist";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", listForm: FormList): void;
}>();

const listForm: FormList = reactive({
  title: "",
  description: "",
  closureDate: "",
  isShared: false,
  ownersIds: [],
  grantedUsersIds: [],
});

const listFormValidation: FormListValidation = reactive({
  title: {
    isError: false,
    errorMessage: "",
  },
  description: {
    isError: false,
    errorMessage: "",
  },
  closureDate: {
    isError: false,
    errorMessage: "",
  },
});

const hasClosureDate = ref(false);

const handleSubmit = () => {
  if (validateList()) {
    emit("submit", listForm);
    resetListForm();
    resetListFormValidation();
  }
};

const validateList = (): boolean => {
  if (listForm.title.trim() === "") {
    listFormValidation.title.isError = true;
    listFormValidation.title.errorMessage =
      "Le nom de la liste ne peut pas être vide";
    return false;
  }
  return true;
};

const resetListForm = () => {
  listForm.title = "";
  listForm.description = "";
  listForm.closureDate = "";
  listForm.ownersIds = [];
  listForm.grantedUsersIds = [];
};

const resetListFormValidation = () => {
  listFormValidation.title.errorMessage = "";
  listFormValidation.title.isError = false;
  listFormValidation.description.errorMessage = "";
  listFormValidation.description.isError = false;
  listFormValidation.closureDate.errorMessage = "";
  listFormValidation.closureDate.isError = false;
};
</script>

<template>
  <div
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full bg-gray-400 bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-400 flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-md h-5/6">
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
            Créer une liste
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="list-name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom de la liste*
              </label>
              <input
                id="list-name"
                v-model="listForm.title"
                type="text"
                name="list-name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ma liste de Noël"
                required
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{
                  listFormValidation.title.isError ? "Erreur :" : ""
                }}</span>
                {{ listFormValidation.title.errorMessage }}
              </p>
            </div>
            <div>
              <label
                for="list-description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                id="list-description"
                v-model="listForm.description"
                type="text"
                name="list-description"
                placeholder="Une brève description de ma liste"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{
                  listFormValidation.description.isError ? "Erreur :" : ""
                }}</span>
                {{ listFormValidation.description.errorMessage }}
              </p>
            </div>
            <div class="flex justify-between">
              <label class="inline-flex relative items-center cursor-pointer">
                <input
                  v-model="hasClosureDate"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Ajouter une date d'échéance</span
                >
              </label>
            </div>
            <div v-if="hasClosureDate">
              <label
                for="list-closure-date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date d'échéance
              </label>
              <input
                id="list-closure-date"
                v-model="listForm.closureDate"
                type="date"
                name="list-closure-date"
                placeholder="25/12/2025"
                :disabled="!hasClosureDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{
                  listFormValidation.closureDate.isError ? "Erreur :" : ""
                }}</span>
                {{ listFormValidation.closureDate.errorMessage }}
              </p>
            </div>

            <div>
              <label
                for="list-closure-date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Propriétaire(s) de la liste
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
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
