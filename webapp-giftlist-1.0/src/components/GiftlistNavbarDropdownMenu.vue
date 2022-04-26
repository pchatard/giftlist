<template>
	<div class="text-right ml-2">
		<Menu as="div" class="relative inline-block text-left">
			<div>
				<MenuButton
					class="inline-flex justify-center items-center w-full px-4 py-2 text-sm text-black bg-white rounded-md shadow-sm border border-gray-100 hover:border-gray-200 focus:outline-none"
				>
					<UserCircleIcon class="h-5 w-5 mr-2 text-gray-400" />
					{{ auth.user.name }}
					<ChevronDownIcon class="w-5 h-5 ml-4 -mr-1 text-black" aria-hidden="true" />
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-gray-50 text-indigo-600' : 'text-black',
									'group flex rounded-md items-center w-full px-4 py-3 text-sm',
								]"
								@click="redirectToProfile"
							>
								<UserIcon class="w-5 h-5 mr-2" />
								{{ labels.navbar.dropdown.profile }}
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-gray-50 text-indigo-600' : 'text-black',
									'group flex rounded-md items-center w-full px-4 py-3 text-sm',
								]"
								@click="redirectToFriends"
							>
								<UsersIcon class="w-5 h-5 mr-2" />
								{{ labels.navbar.dropdown.friends }}
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-gray-50 text-indigo-600' : 'text-black',
									'group flex rounded-md items-center w-full px-4 py-3 text-sm',
								]"
								@click="redirectToSettings"
							>
								<CogIcon class="w-5 h-5 mr-2" />
								{{ labels.navbar.dropdown.settings }}
							</button>
						</MenuItem>
					</div>
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active ? 'bg-gray-50 text-red-600' : 'text-black',
								'group flex rounded-md items-center w-full px-4 py-3 text-sm',
							]"
							@click="$emit('logout')"
						>
							<LogoutIcon class="w-5 h-5 mr-2" />
							{{ labels.navbar.dropdown.logout }}
						</button>
					</MenuItem>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { CogIcon, LogoutIcon, UserCircleIcon, UserIcon, UsersIcon } from "@heroicons/vue/outline";
import { ChevronDownIcon } from "@heroicons/vue/solid";

defineEmits<{
	(e: "logout"): void;
}>();

const router = useRouter();
const auth = ref(inject("Auth") as Auth0Client);

const redirectToProfile = () => {
	router.push("/app/profile");
};

const redirectToFriends = () => {
	router.push("/app/profile/friends");
};

const redirectToSettings = () => {
	router.push("/app/settings");
};
</script>
