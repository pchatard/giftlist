<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { onMounted } from "vue";

export interface ErrorInfoProps {
  message: string;
  redirection?: {
    name: string;
    path: string;
  };
}

const props = defineProps<ErrorInfoProps>();
const emit = defineEmits<{
  (e: "redirect"): void;
}>();

onMounted(() => {
  if (props.redirection !== undefined) {
    setTimeout(() => {
      emit("redirect");
    }, 5000);
  }
});
</script>

<template>
  <div class="w-full flex flex-col items-center text-center gap-8">
    <XCircleIcon
      class="text-red-600 bg-red-100 dark:bg-red-300 rounded-full w-28 md:1/6"
    />
    <div class="flex flex-col gap-3">
      <span>{{ message }}</span>
      <div v-if="redirection" class="flex flex-col items-stretch gap-3">
        <div>
          Vous allez être redirigé vers la page
          <RouterLink
            :to="redirection.path"
            class="font-bold text-primary-600"
            >{{ redirection.name }}</RouterLink
          >
          dans 5 secondes.
        </div>
        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div class="flex flex-col items-center gap-3">
          <div class="text-sm">
            Si la redirection n'a pas fonctionné, cliquez sur le bouton
            ci-dessous.
          </div>
          <button
            class="w-full md:w-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="() => emit('redirect')"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
