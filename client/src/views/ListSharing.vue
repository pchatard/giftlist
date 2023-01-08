<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import { lists } from "@/data/lists";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { inject, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
const list = computed(() => {
  return lists.find((list) => list.id == currentRoute.params.listId);
});
const sharingLink = computed(() => {
  const link = new URL(
    window.location.origin + "/#/app/lists/invite/" + list.value?.sharingCode
  );
  return link.href;
});
const sharingLinkIsCopied = ref(false);

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const initialBreadcrumbContent = computed(() => [
  {
    name: "Mes listes",
    path: `/app/lists`,
  },
  {
    name: list.value?.title ?? "Liste X",
    path: `/app/lists/${currentRoute.params.listId}`,
  },
  { name: currentRoute.name?.toString(), path: currentRoute.fullPath },
]);

onMounted(() => {
  setBreadcrumbContent(initialBreadcrumbContent.value);
});

const copy = () => {
  navigator.clipboard.writeText(sharingLink.value);
  sharingLinkIsCopied.value = true;
  setTimeout(() => {
    sharingLinkIsCopied.value = false;
  }, 10000);
};
</script>

<template>
  <div>
    <PageHeading>{{ currentRoute.name }}</PageHeading>

    <div>
      <p class="mb-2">
        Cette liste est actuellement
        {{
          list?.isShared
            ? `partagée avec ${list?.grantedUsersDTO?.length ?? 0} personnes`
            : "privée"
        }}.
      </p>
      <button
        class="w-full md:w-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {{ list?.isShared ? "Passer en privé" : "Partager la liste" }}
      </button>
      <div v-if="list?.isShared" class="my-2">
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
            @click="copy"
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
          @click="copy"
        >
          Copier le lien de partage
        </button>
      </div>
    </div>

    <div v-if="list?.isShared" class="my-8">
      <div>
        <h2 class="text-xl md:text-2xl font-bold dark:text-white">
          Ajouter des invités
        </h2>

        <p>Invitez vos amis à votre liste :</p>

        <form>
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Ajouter des amis
          </label>
          <div class="relative md:w-1/2 my-2">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <UsersIcon class="w-5" />
            </div>
            <input
              id="search"
              type="search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>

      <div class="mt-8">
        <h2 class="text-xl md:text-2xl font-bold dark:text-white mb-2">
          Gérer les invités
        </h2>
        <p>Les personnes suivantes ont accès à votre liste</p>
        <ul
          class="w-full lg:w-1/2 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li
            v-for="user in list.grantedUsersDTO"
            :key="user.id"
            class="py-3 sm:pb-4"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <!-- <img
                  class="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Neil image"
                /> -->
                <div
                  class="w-8 h-8 rounded-full border border-gray-300 bg-gray-300"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  {{ user.displayName }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  test@giftlist.com
                </p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
              >
                <button
                  class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 lg:cursor-pointer dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  <XMarkIcon class="w-5 text-red-600" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
