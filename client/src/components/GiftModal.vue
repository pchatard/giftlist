<script setup lang="ts">
import type { FormGift, FormGiftValidation } from "@/types/giftlist";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", giftForm: FormGift): void;
}>();

const route = useRoute();

const giftForm: FormGift = reactive({
  title: "",
  isFavorite: false,
  isHidden: false,
  category: "",
  listId: "",
  price: 0,
  linkURL: "",
  brand: "",
  size: "",
  color: "",
  comments: "",
});

const giftFormValidation: FormGiftValidation = reactive({
  title: {
    isError: false,
    errorMessage: "",
  },
  category: {
    isError: false,
    errorMessage: "",
  },
  price: {
    isError: false,
    errorMessage: "",
  },
  linkURL: {
    isError: false,
    errorMessage: "",
  },
  brand: {
    isError: false,
    errorMessage: "",
  },
  size: {
    isError: false,
    errorMessage: "",
  },
  color: {
    isError: false,
    errorMessage: "",
  },
  comments: {
    isError: false,
    errorMessage: "",
  },
});

const handleSubmit = () => {
  if (validateGift()) {
    emit("submit", giftForm);
    resetListForm();
    resetListFormValidation();
  }
};

const validateGift = (): boolean => {
  if (giftForm.title.trim() === "") {
    giftFormValidation.title.isError = true;
    giftFormValidation.title.errorMessage =
      "Le nom du cadeau ne peut pas être vide";
    return false;
  }
  return true;
};

const resetListForm = () => {
  giftForm.title = "";
  giftForm.category = "";
  giftForm.brand = "";
  giftForm.color = "";
  giftForm.size = "";
  giftForm.price = 0;
  giftForm.linkURL = "";
  giftForm.isFavorite = false;
  giftForm.isHidden = false;
};

const resetListFormValidation = () => {
  giftFormValidation.title.errorMessage = "";
  giftFormValidation.title.isError = false;
  giftFormValidation.category.errorMessage = "";
  giftFormValidation.category.isError = false;
  giftFormValidation.brand.errorMessage = "";
  giftFormValidation.brand.isError = false;
  giftFormValidation.price.errorMessage = "";
  giftFormValidation.price.isError = false;
  giftFormValidation.color.errorMessage = "";
  giftFormValidation.color.isError = false;
  giftFormValidation.size.errorMessage = "";
  giftFormValidation.size.isError = false;
  giftFormValidation.linkURL.errorMessage = "";
  giftFormValidation.linkURL.isError = false;
  giftFormValidation.comments.errorMessage = "";
  giftFormValidation.comments.isError = false;
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
            {{ route.fullPath.endsWith("/new") ? "Créer" : "Modifier" }} un
            cadeau
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="gift-name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom du cadeau*
              </label>
              <input
                id="gift-name"
                v-model="giftForm.title"
                type="text"
                name="gift-name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Mon cadeau de Noël"
                required
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{
                  giftFormValidation.title.isError ? "Erreur :" : ""
                }}</span>
                {{ giftFormValidation.title.errorMessage }}
              </p>
            </div>
            <div>
              <label
                for="gift-category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Catégorie
              </label>
              <select
                id="gift-category"
                v-model="giftForm.category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choisir une catégorie</option>
                <option value="US">Vêtements</option>
                <option value="CA">Mobilier / Décoration</option>
                <option value="FR">Spectacles / Concerts</option>
                <option value="DE">Expérience</option>
                <option value="DE">High Tech / Jeux vidéos</option>
                <option value="DE">Autres</option>
              </select>
            </div>

            <div>
              <label
                for="gift-price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Prix
              </label>
              <input
                id="gift-price"
                v-model="giftForm.price"
                type="number"
                name="gift-price"
                placeholder="Lien vers le cadeau"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div>
              <label
                for="gift-link"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lien
              </label>
              <input
                id="gift-link"
                v-model="giftForm.linkURL"
                type="link"
                name="gift-link"
                placeholder="Lien vers le cadeau"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div
              class="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500"
            >
              Plus
              <ArrowRightIcon class="w-5 ml-1" />
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
