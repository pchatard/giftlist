<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import PageHeading from "@/components/PageHeading.vue";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import { useListsStore } from "@/stores/lists";
import type { BreadcrumbContentData } from "@/types";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const currentRoute = useRoute();

const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

const listsStore = useListsStore();
const sharingCode = useRoute().params.sharingCode as string;

const error = ref("");

onMounted(() => {
  setBreadcrumbContent([
    { name: currentRoute.name ?? "", path: currentRoute.fullPath },
  ]);
  listsStore
    .requestAccessToSharedList(sharingCode)
    .then((response: { listId?: string; error?: string }) => {
      if (response.listId) {
        router.push("/app/lists/" + response.listId);
      } else if (response.error) {
        error.value = response.error;
      }
    });
});
</script>

<template>
  <div>
    <PageHeading>Accès à une liste partagée</PageHeading>
    <div
      class="m-auto w-full md:w-1/2 flex flex-col justify-center gap-8 items-center h-[calc(100vh-158px-1rem)] text-gray-400"
    >
      <div
        v-if="error"
        class="flex flex-col items-center justify-center px-4 gap-4"
      >
        <XCircleIcon class="w-1/5 text-red-600" />
        <div class="text-md text-center md:text-lg">
          {{ error }}
        </div>
        <button
          type="button"
          class="text-white w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="router.push('/app/lists')"
        >
          Retour vers Mes listes
        </button>
      </div>
      <div v-else class="flex flex-col items-center justify-center px-4 gap-4">
        <LoadingSpinner />
        <div class="text-md text-center md:text-lg">
          Demande d'accès à la liste en cours
        </div>
      </div>
    </div>
  </div>
</template>
