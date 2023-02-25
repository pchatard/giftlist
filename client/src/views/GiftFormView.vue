<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import { lists } from "@/data/lists";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import { useGiftsStore } from "@/stores/gifts";
import type { BreadcrumbContentData } from "@/types";
import type { FormGift, FormGiftValidation } from "@/types/giftlist";
import { inject, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const currentRoute = useRoute();
const listId =
  typeof currentRoute.params.listId == "string"
    ? currentRoute.params.listId
    : currentRoute.params.listId[0];

const giftsStore = useGiftsStore();

const giftForm: FormGift = reactive({
  title: "",
  isFavorite: false,
  isHidden: false,
  category: "",
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
    // API Call (Create / Update) + Redirection to list
    giftsStore.createGift(listId, giftForm).then(() => {
      resetGiftForm();
      resetGiftFormValidation();
      console.log("TWO");
      router.push("/app/lists/" + listId);
    });
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

const resetGiftForm = () => {
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

const resetGiftFormValidation = () => {
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

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(() => {
  const giftId = currentRoute.params.giftId;
  if (giftId) {
    // Get gift data and populate giftForm with it.
    console.log("Editing gift " + giftId);
  } else {
    console.log("Creating new gift");
  }

  setBreadcrumbContent([
    { name: "Mes listes", path: "/app/lists" },
    ...(listId
      ? [
          {
            name: lists.find((list) => list.id == listId)?.title ?? "Liste X",
            path: "/app/lists/" + listId,
          },
        ]
      : []),
    { name: currentRoute.name ?? "", path: currentRoute.fullPath },
  ]);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">{{ currentRoute.name }}</PageHeading>
    </div>

    <div>
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mon cadeau de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ giftFormValidation.title.isError ? "Erreur :" : "" }}
            </span>
            {{ giftFormValidation.title.errorMessage }}
          </p>
        </div>

        <label class="flex relative items-center cursor-pointer">
          <input
            v-model="giftForm.isFavorite"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
          ></div>
          <span
            class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Ajouter à mes favoris
          </span>
        </label>

        <label class="flex relative items-center cursor-pointer">
          <input
            v-model="giftForm.isHidden"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
          ></div>
          <span
            class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Cacher ce cadeau pour le moment
          </span>
        </label>
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

        <div>
          <label
            for="gift-brand"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Marque
          </label>
          <input
            id="gift-brand"
            v-model="giftForm.brand"
            type="text"
            name="gift-brand"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mon cadeau de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ giftFormValidation.brand.isError ? "Erreur :" : "" }}
            </span>
            {{ giftFormValidation.brand.errorMessage }}
          </p>
        </div>

        <div>
          <label
            for="gift-color"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Couleur
          </label>
          <input
            id="gift-color"
            v-model="giftForm.color"
            type="text"
            name="gift-color"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mon cadeau de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ giftFormValidation.color.isError ? "Erreur :" : "" }}
            </span>
            {{ giftFormValidation.color.errorMessage }}
          </p>
        </div>

        <div>
          <label
            for="gift-size"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Taille
          </label>
          <input
            id="gift-size"
            v-model="giftForm.size"
            type="text"
            name="gift-size"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mon cadeau de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ giftFormValidation.size.isError ? "Erreur :" : "" }}
            </span>
            {{ giftFormValidation.size.errorMessage }}
          </p>
        </div>

        <div>
          <label
            for="gift-comments"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Commentaire
          </label>
          <input
            id="gift-comments"
            v-model="giftForm.comments"
            type="text"
            name="gift-comments"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Mon cadeau de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ giftFormValidation.comments.isError ? "Erreur :" : "" }}
            </span>
            {{ giftFormValidation.comments.errorMessage }}
          </p>
        </div>

        <button
          type="button"
          class="w-full md:w-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="handleSubmit"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>
