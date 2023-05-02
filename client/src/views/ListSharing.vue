<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import UsersTable from "@/components/UsersTable.vue";
import UsersIconStack from "@/components/UsersIconStack.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorInfo from "@/components/ErrorInfo.vue";
import {
  breadcrumbContentInjectionKey,
  showFriendsFeaturesInjectionKey,
} from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/vue/24/outline";
import { inject, computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useListsStore } from "@/stores/lists";
import { storeToRefs } from "pinia";
import { useGiftsStore } from "@/stores/gifts";

// Router
const currentRoute = useRoute();
const listId =
  typeof currentRoute.params.listId == "string"
    ? currentRoute.params.listId
    : currentRoute.params.listId[0];

// Injections
const showFriendsFeatures = inject(showFriendsFeaturesInjectionKey);

// Store and list data
const listsStore = useListsStore();
const giftsStore = useGiftsStore();
const { selectedList } = storeToRefs(listsStore);

const loading = ref(!selectedList.value);
const defaultErrorMessage = "Vous n'êtes pas autorisé à consulter cette page.";
const errorMessage = ref(
  selectedList.value?.isOwner === false ? defaultErrorMessage : ""
);
const errorRedirection = ref({
  name: "Mes listes partagées",
  path: "/app/lists/shared",
});

const sharingLinkIsCopied = ref(false);
const sharingLink = computed(() => {
  const link = new URL(
    window.location.origin +
      "/#/app/lists/invite/" +
      selectedList.value?.sharingCode
  );
  return link.href;
});

// Breadcrumb
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: "Mes listes",
    path: `/app/lists`,
  },
  {
    name: selectedList.value?.title ?? "...",
    path: `/app/lists/${listId}`,
  },
  { name: currentRoute.name?.toString(), path: currentRoute.fullPath },
]);

// Handlers
const handleShare = () => {
  if (selectedList.value && selectedList.value.id) {
    if (selectedList.value?.isShared) {
      listsStore.unshareList(selectedList.value.id);
    } else {
      listsStore.shareList(selectedList.value.id);
    }
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(sharingLink.value);
  sharingLinkIsCopied.value = true;
  setTimeout(() => {
    sharingLinkIsCopied.value = false;
  }, 10000);
};

// Initialization
onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
  listsStore
    .getList(listId)
    .then(() => {
      if (!selectedList.value?.isOwner) {
        throw new Error(defaultErrorMessage);
      }
      setBreadcrumbContent(initialBreadcrumbContent.value);
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
    <PageHeading>{{ selectedList?.title }} - Options de partage</PageHeading>

    <div>
      <p class="mb-2">
        Cette liste est actuellement
        {{
          selectedList?.isShared
            ? `partagée avec ${
                selectedList?.grantedUsersDTO?.length ?? 0
              } personnes`
            : "privée"
        }}.
      </p>
      <button
        class="w-full md:w-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        @click="handleShare"
      >
        {{ selectedList?.isShared ? "Passer en privé" : "Partager la liste" }}
      </button>
      <div v-if="selectedList?.isShared" class="my-2">
        <label
          for="list-sharing-code"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Votre code de partage</label
        >
        <div class="flex">
          <input
            id="list-sharing-link"
            type="text"
            :value="sharingLink"
            name="list-sharing-link"
            class="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block min-w-0 w-full md:w-1/2 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
          />
          <span
            class="inline-flex cursor-pointer items-center px-3 text-sm text-primary-600 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-800 dark:text-primary-400 dark:border-gray-600"
            @click="handleCopy"
          >
            <ClipboardDocumentCheckIcon
              v-if="sharingLinkIsCopied"
              class="w-5 text-green-500"
            />
            <ClipboardDocumentIcon v-else class="w-5" />
          </span>
        </div>
        <button
          class="mt-2 font-small flex items-center text-blue-600 dark:text-blue-500 hover:underline"
          @click="handleCopy"
        >
          Copier le lien de partage
        </button>
      </div>
    </div>

    <div v-if="showFriendsFeatures && selectedList?.isShared" class="my-8">
      <div class="mt-8 space-y-2">
        <h2 class="text-xl md:text-2xl font-bold dark:text-white mb-2">
          Gérer les invités
        </h2>
        <UsersIconStack />
        <p>Ajoutez ou supprimez vos amis des invités pour cette liste :</p>
        <UsersTable />
      </div>
    </div>
  </div>
</template>
