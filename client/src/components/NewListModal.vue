<script setup lang="ts">
import { XMarkIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

// export interface NewListModalProps {
//   list:
// }

defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();

const hasClosureDate = ref(true);
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
            Créer une liste
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="list-name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom de la liste
              </label>
              <input
                id="list-name"
                type="text"
                name="list-name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ma liste de Noël"
                required
              />
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
                type="text"
                name="list-description"
                placeholder="Une brève description de ma liste"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
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
            <div>
              <label
                for="list-closure-date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date d'échéance
              </label>
              <input
                id="list-closure-date"
                type="text"
                name="list-closure-date"
                placeholder="25/12/2025"
                :disabled="!hasClosureDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div
              class="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500"
            >
              Options de partage
              <ArrowRightIcon class="w-5 ml-1" />
            </div>

            <button
              type="button"
              class="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="$emit('submit')"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
