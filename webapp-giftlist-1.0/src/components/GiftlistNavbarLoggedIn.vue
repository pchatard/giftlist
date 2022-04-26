<template>
	<div class="flex flex-row items-center">
		<router-link to="/app/lists">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center">
			<GiftlistNavbarItem
				path="/app/lists"
				:text="labels.navbar.links.lists"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<CollectionIcon class="giftlist-navbar-item-icon h-4 w-4" />
			</GiftlistNavbarItem>
			<GiftlistNavbarItem
				path="/app/shared"
				:text="labels.navbar.links.shared"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<UserGroupIcon class="giftlist-navbar-item-icon h-4 w-4" />
			</GiftlistNavbarItem>
			<GiftlistNavbarItem
				path="/app/booked"
				:text="labels.navbar.links.booked"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<GiftIcon class="giftlist-navbar-item-icon h-4 w-4" />
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
				...currentRoute.value.meta.navbarCta,
				action: listsNavbarCta,
			};
		case "/app/shared":
			return {
				...currentRoute.value.meta.navbarCta,
				action: sharedListsNavbarCta,
			};
		default:
			return {
				...currentRoute.value.meta.navbarCta,
				action: listNavbarCta,
			};
	}
});

const logout = () => {
	auth.value.logout({
		returnTo: window.location.origin,
	});
};
</script>

<style lang="scss" scoped>
.giftlist-navbar-item {
	.giftlist-navbar-item-icon {
		@apply transition-all duration-200;
	}

	&:hover {
		.giftlist-navbar-item-icon {
			@apply text-yellow-400;
		}
	}
}
</style>
