<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import UsersTable from "@/components/UsersTable.vue";
import { useGiftlistApi } from "@/composables/giftlistApi";
import { breadcrumbContentInjectionKey } from "@/injectionSymbols";
import type { BreadcrumbContentData } from "@/types";
import { useAuth0 } from "@auth0/auth0-vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { inject, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import type { UserDTO } from "../types/users";

const { user } = useAuth0();
const { fetchApi } = useGiftlistApi();

let data = reactive<UserDTO>({
  displayName: "",
  email: "",
  bookingsDTO: [],
});

const currentRoute = useRoute();
const { setBreadcrumbContent } = inject(
  breadcrumbContentInjectionKey
) as BreadcrumbContentData;

onMounted(async () => {
  data = await fetchApi("users/me");
  setBreadcrumbContent([
    { name: currentRoute.name ?? "", path: currentRoute.fullPath },
  ]);
});
</script>

<template>
  <div>
    <PageHeading>Mon compte</PageHeading>

    <div class="flex items-center gap-12">
      <div class="flex flex-col items-center">
        <img
          class="w-24 h-24 object-cover rounded-full"
          :src="user.picture"
          alt=""
        />
        <div>{{ user.nickname }}</div>
      </div>

      <div>
        <div>7 listes</div>
        <!-- TODO: HARDCODED -->
        <div>{{ data.bookingsDTO.length }} cadeaux réservés</div>
        <div>12 cadeaux offerts</div>
        <!-- TODO: HARDCODED -->
      </div>
    </div>

    <div class="space-y-2 mt-4">
      <h2 class="text-xl md:text-2xl font-bold dark:text-white">
        Informations personnelles
      </h2>

      <div>
        <h3 class="text-lg md:text-xl font-medium dark:text-white">
          Changer mon mot de passe
        </h3>
        <div>
          TODO :
          <a
            href="https://auth0.com/docs/authenticate/database-connections/password-change"
            target="_blank"
            rel="noopener noreferrer"
            >Auth0 Authentication API
          </a>
        </div>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-medium dark:text-white">
          Changer mon adresse email
        </h3>
        <div>TODO</div>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="text-xl md:text-2xl font-bold dark:text-white">
        Gérer mes amis
      </h2>

      <form class="mt-2">
        <label
          for="add-friend"
          class="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Ajouter une personne à vos amis</label
        >
        <div class="relative lg:w-2/3">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <MagnifyingGlassIcon class="w-5" />
          </div>
          <input
            id="add-friend"
            type="email"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="monami@giftlist.com"
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ajouter
          </button>
        </div>
        <p class="text-sm mt-2">
          Entrez une adresse email pour l'ajouter à vos amis.
        </p>
      </form>

      <UsersTable class="mt-4" />
    </div>
  </div>
</template>
