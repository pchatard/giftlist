<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorInfo from "@/components/ErrorInfo.vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import { useGiftsStore } from "@/stores/gifts";
import { useListsStore } from "@/stores/lists";
import type { BreadcrumbContentData } from "@/types";
import type { FormGift, FormGiftValidation } from "@/types/giftlist";
import { giftCategory } from "@/types/giftlist";
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, reactive, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

// Router
const router = useRouter();
const currentRoute = useRoute();
const listId =
  typeof currentRoute.params.listId == "string"
    ? currentRoute.params.listId
    : currentRoute.params.listId[0];

const isEditMode =
  currentRoute.fullPath.endsWith("/edit") &&
  currentRoute.fullPath.includes("gift");

// Gift store
const giftsStore = useGiftsStore();
const listsStore = useListsStore();
const currentGift = computed(() => {
  return isEditMode ? selectedGift.value : null;
});
const { selectedGift } = storeToRefs(giftsStore);
const { selectedList } = storeToRefs(listsStore);

const loading = ref(true);
const defaultErrorMessage = "Vous n'êtes pas autorisé à consulter cette page.";
const errorMessage = ref(
  selectedList.value?.isOwner === false ? defaultErrorMessage : ""
);
const errorRedirection = ref({
  name: selectedList.value?.title ?? "Liste partagée",
  path: "/app/lists/" + listId,
});

// Gift form data and validation
const giftForm: FormGift = reactive(
  currentGift.value
    ? {
        title: currentGift.value.title,
        isFavorite: currentGift.value.isFavorite,
        isHidden: currentGift.value.isHidden,
        category: currentGift.value.category,
        price: currentGift.value.price,
        linkURL: currentGift.value.linkURL,
        brand: currentGift.value.brand,
        size: currentGift.value.size,
        color: currentGift.value.color,
        comments: currentGift.value.color,
      }
    : {
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
      }
);

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

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

// Handlers
const handleSubmit = () => {
  if (validateGift()) {
    isEditMode && currentGift.value
      ? giftsStore.editGift(listId, currentGift.value.id, giftForm).then(() => {
          resetGiftForm();
          resetGiftFormValidation();
          router.push("/app/lists/" + listId);
        })
      : // API Call (Create / Update) + Redirection to list
        giftsStore.createGift(listId, giftForm).then(() => {
          resetGiftForm();
          resetGiftFormValidation();
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

const handleGiftLinkClick = () => {
  if (giftForm.linkURL) {
    window.open(giftForm.linkURL, "_blank", "noreferrer");
  }
};

const initialCreationBreadcrumbContent = computed(() => [
  { name: "Mes listes", path: "/app/lists" },
  {
    name: selectedList.value?.title ?? "...",
    path: "/app/lists/" + listId,
  },
  { name: currentRoute.name ?? "", path: currentRoute.fullPath },
]);

onMounted(() => {
  setBreadcrumbContent(initialCreationBreadcrumbContent.value);
  listsStore
    .getList(listId)
    .then(() => {
      if (!selectedList.value?.isOwner) {
        errorRedirection.value.name =
          selectedList.value?.title ?? "Liste partagée";
        throw new Error(defaultErrorMessage);
      }
      setBreadcrumbContent(initialCreationBreadcrumbContent.value);
    })
    .then(() => {
      if (isEditMode) {
        let giftId =
          typeof currentRoute.params.giftId == "string"
            ? currentRoute.params.giftId
            : currentRoute.params.giftId[0];
        giftsStore.getGift(listId, giftId).then(() => {
          if (currentGift.value) {
            giftForm.title = currentGift.value?.title;
            giftForm.isFavorite = currentGift.value?.isFavorite;
            giftForm.isHidden = currentGift.value?.isHidden;
            giftForm.category = currentGift.value?.category;
            giftForm.price = currentGift.value?.price;
            giftForm.linkURL = currentGift.value?.linkURL;
            giftForm.brand = currentGift.value?.brand;
            giftForm.size = currentGift.value?.size;
            giftForm.color = currentGift.value?.color;
            giftForm.comments = currentGift.value?.color;
          }
        });
      }
    })
    .catch((error: Error) => {
      errorMessage.value = error.message;
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
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">{{
        currentRoute.fullPath.includes("edit")
          ? "Modifier " + (currentGift?.title ?? "un cadeau")
          : currentRoute.name
      }}</PageHeading>
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
            <option
              v-for="(key, value) of giftCategory"
              :key="value"
              :value="value"
            >
              {{ key }}
            </option>
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
          <!-- <input
            id="gift-link"
            v-model="giftForm.linkURL"
            type="link"
            name="gift-link"
            placeholder="Lien vers le cadeau"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          /> -->

          <div class="flex">
            <input
              id="gift-link"
              v-model="giftForm.linkURL"
              type="link"
              name="gift-link"
              class="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block min-w-0 w-full md:w-1/2 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="{ 'rounded-r-lg': !giftForm.linkURL }"
            />
            <span
              v-if="giftForm.linkURL"
              class="inline-flex cursor-pointer items-center px-3 text-sm text-primary-600 hover:text-primary-700 bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-primary-400 dark:border-gray-600"
              @click="handleGiftLinkClick"
            >
              <ArrowTopRightOnSquareIcon class="w-5" />
            </span>
          </div>
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
