<template>
	<div class="flex flex-row items-center">
		<router-link to="/app/lists">
			<span class="bg-logo text-white rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center">
			<GiftlistNavbarItem
				path="/app/lists"
				:text="labels.navbar.links.lists"
				:outline="true"
				class="group"
			>
				<CollectionIcon class="transition-all duration-200 group-hover:text-logo h-4 w-4" />
			</GiftlistNavbarItem>
			<GiftlistNavbarItem
				path="/app/shared"
				:text="labels.navbar.links.shared"
				:outline="true"
				class="group"
			>
				<UserGroupIcon class="transition-all duration-200 group-hover:text-logo h-4 w-4" />
			</GiftlistNavbarItem>
		</ul>
	</div>
	<div class="flex flex-row items-center">
		<GiftlistButton v-if="cta" :has-icon="true" @click="cta.action">
			<template #icon>
				<PlusCircleIcon />
			</template>
			{{ cta.name }}
		</GiftlistButton>
		<GiftlistNavbarDropdownMenu @logout="logout" />
	</div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistNavbarDropdownMenu from "@/components/GiftlistNavbarDropdownMenu.vue";
import GiftlistNavbarItem from "@/components/GiftlistNavbarItem.vue";

import { CollectionIcon, GiftIcon, PlusCircleIcon, UserGroupIcon } from "@heroicons/vue/outline";

const router = useRouter();
const auth = ref(inject("Auth") as Auth0Client);

const currentRoute = router.currentRoute;

const sharedListsNavbarCta = (): void => {
	router.push("/app/shared/new");
};

const listNavbarCta = (): void => {
	const listId = router.currentRoute.value.params.id;
	router.push(`/app/lists/${listId}/new-gift`);
};

const listsNavbarCta = (): void => {
	router.push("/app/lists/new");
};

const cta = computed(() => {
	switch (currentRoute.value.path) {
		case "/app/lists":
			return {
				name: (currentRoute.value.meta.navbarCta as Record<string, string>).name,
				action: listsNavbarCta,
			};
		case "/app/shared":
			return {
				name: (currentRoute.value.meta.navbarCta as Record<string, string>).name,
				action: sharedListsNavbarCta,
			};
		default:
			if (currentRoute.value.path.includes("/app/lists") && currentRoute.value.meta.navbarCta) {
				return {
					name: (currentRoute.value.meta.navbarCta as Record<string, string>).name,
					action: listNavbarCta,
				};
			} else {
				return null;
			}
	}
});

const logout = () => {
	auth.value.logout({
		returnTo: window.location.origin,
	});
};
</script>
