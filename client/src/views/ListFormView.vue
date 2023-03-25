<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import {
  breadcrumbContentInjectionKey,
  showFriendsFeaturesInjectionKey,
} from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import type { FormList, FormListValidation } from "@/types/giftlist";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import UsersTable from "@/components/UsersTable.vue";
import UsersIconStack from "@/components/UsersIconStack.vue";
import { useListsStore } from "@/stores/lists";
import { storeToRefs } from "pinia";
import { useGiftsStore } from "@/stores/gifts";

// Router
const router = useRouter();
const currentRoute = useRoute();

// Injection
const showFriendsFeatures = inject(showFriendsFeaturesInjectionKey);

// Lists store
const listsStore = useListsStore();
const giftsStore = useGiftsStore();
const currentList = computed(() => {
  return currentRoute.fullPath.endsWith("/edit") ? selectedList.value : null;
});
const { selectedList, myLists } = storeToRefs(listsStore);

// List form data and validation
const listForm: FormList = reactive(
  currentList.value
    ? {
        title: currentList.value.title ?? "",
        description: currentList.value.description,
        closureDate: currentList.value.closureDate,
        isShared: currentList.value.isShared,
        ownersIds: currentList.value.ownersDTO?.map((owner) => owner.id) ?? [],
        grantedUsersIds:
          currentList.value.grantedUsersDTO?.map((granted) => granted.id) ?? [],
      }
    : {
        title: "",
        description: "",
        closureDate: "",
        isShared: false,
        ownersIds: [],
        grantedUsersIds: [],
      }
);

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

const hasClosureDate = ref(Boolean(currentList.value?.closureDate));

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

// Handlers
function handleSubmit() {
  if (validateList()) {
    currentList.value
      ? listsStore
          .editList(currentList.value.id, listForm)
          .then((listId: string) => {
            if (listId) {
              resetListForm();
              resetListFormValidation();
              router.push("/app/lists/" + listId);
            }
          })
      : listsStore
          .createList(listForm)
          .then((listId) => {
            resetListForm();
            resetListFormValidation();
            router.push("/app/lists/" + listId);
          })
          .catch((err) => {
            console.log(err);
          });
  }
}

const validateList = (): boolean => {
  if (listForm.title.trim() === "") {
    listFormValidation.title.isError = true;
    listFormValidation.title.errorMessage =
      "Le nom de la liste ne peut pas être vide";
    return false;
  }
  return true;
};

onMounted(() => {
  let listId = "";
  if (currentRoute.fullPath.includes("edit")) {
    listId =
      typeof currentRoute.params.listId == "string"
        ? currentRoute.params.listId
        : currentRoute.params.listId[0];
    listsStore.getList(listId).then(() => {
      listForm.title = currentList.value?.title ?? "";
      listForm.description = currentList.value?.description;
      listForm.closureDate = currentList.value?.closureDate;
      hasClosureDate.value = Boolean(currentList.value?.closureDate);
      listForm.isShared = currentList.value?.isShared ?? false;
      listForm.ownersIds =
        currentList.value?.ownersDTO?.map((owner) => owner.id) ?? [];
      listForm.grantedUsersIds =
        currentList.value?.grantedUsersDTO?.map((granted) => granted.id) ?? [];
    });
  }

  const list = myLists.value.find((list) => list.id === listId);
  if (list) {
    setBreadcrumbContent([
      { name: "Mes listes", path: "/app/lists" },
      ...(listId
        ? [
            {
              name: list.title ?? "Liste X",
              path: "/app/lists/" + listId,
            },
          ]
        : []),
      { name: currentRoute.name ?? "", path: currentRoute.fullPath },
    ]);
  } else {
    listsStore.getList(listId).then(() => {
      setBreadcrumbContent([
        { name: "Mes listes", path: "/app/lists" },
        ...(listId
          ? [
              {
                name: selectedList.value?.title ?? "Liste X",
                path: "/app/lists/" + listId,
              },
            ]
          : []),
        { name: currentRoute.name ?? "", path: currentRoute.fullPath },
      ]);
    });
  }
});

watch(hasClosureDate, (newHasClosureDate) => {
  if (newHasClosureDate && currentList.value) {
    listForm.closureDate = currentList.value.closureDate;
  } else {
    listForm.closureDate = "";
  }
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
  <div>
    <div class="flex justify-between items-center mb-4">
      <PageHeading class="mb-0">{{ currentRoute.name }}</PageHeading>
    </div>

    <div class="relative">
      <form class="space-y-6" action="#">
        <div>
          <label
            for="list-name"
            class="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nom de la liste*
          </label>
          <input
            id="list-name"
            v-model="listForm.title"
            type="text"
            name="list-name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Ma liste de Noël"
            required
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">
              {{ listFormValidation.title.isError ? "Erreur :" : "" }}
            </span>
            {{ listFormValidation.title.errorMessage }}
          </p>
        </div>
        <div>
          <label
            for="list-description"
            class="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <span class="font-medium">
              {{ listFormValidation.description.isError ? "Erreur :" : "" }}
            </span>
            {{ listFormValidation.description.errorMessage }}
          </p>
        </div>
        <div class="flex flex-col gap-4 justify-between">
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
            >
              Ajouter une date d'échéance
            </span>
          </label>
          <div v-if="hasClosureDate">
            <label
              for="list-closure-date"
              class="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              <span class="font-medium">
                {{ listFormValidation.closureDate.isError ? "Erreur :" : "" }}
              </span>
              {{ listFormValidation.closureDate.errorMessage }}
            </p>
          </div>
        </div>

        <div v-if="showFriendsFeatures">
          <label
            for="list-closure-date"
            class="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Co-propriétaire(s) de la liste
          </label>

          <UsersIconStack />

          <UsersTable />
        </div>

        <button
          type="button"
          class="w-full md:w-auto sticky bottom-4 md:relative md:bottom-0 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="handleSubmit"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>
