<template>
	<div class="flex flex-row items-center">
		<router-link to="/app/lists">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center">
			<NavbarItem
				path="/app/lists"
				:text="labels.navbar.links.lists"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<CollectionIcon class="giftlist-navbar-item-icon h-4 w-4" />
			</NavbarItem>
			<NavbarItem
				path="/app/shared"
				:text="labels.navbar.links.shared"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<UserGroupIcon class="giftlist-navbar-item-icon h-4 w-4" />
			</NavbarItem>
			<NavbarItem
				path="/app/booked"
				:text="labels.navbar.links.booked"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<GiftIcon class="giftlist-navbar-item-icon h-4 w-4" />
			</NavbarItem>
		</ul>
	</div>
	<div class="flex flex-row items-center">
		<Button v-if="cta" @click="cta.action" :has-icon="true">
			<template #icon>
				<PlusCircleIcon />
			</template>
			{{ cta.name }}
		</Button>
		<NavbarDropdownMenu @logout="logout" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";

import Button from "@/components/Button/Button.vue";
import NavbarDropdownMenu from "@/components/NavbarDropdownMenu/GiftlistNavbarDropdownMenu.vue";
import NavbarItem from "@/components/NavbarItem/GiftlistNavbarItem.vue";
import labels from "@/labels/fr/labels.json";
import { CollectionIcon, GiftIcon, PlusCircleIcon, UserGroupIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "GiftlistNavbarLoggedIn",
	components: {
		Button,
		NavbarItem,
		NavbarDropdownMenu,
		CollectionIcon,
		PlusCircleIcon,
		UserGroupIcon,
		GiftIcon,
	},
	setup() {
		const router = useRouter();
		const currentRoute = router.currentRoute;
		const auth = ref(inject("Auth") as any);

		const logout = () => {
			auth.value.logout({
				returnTo: window.location.origin,
			});
		};
		const cta = computed(() => currentRoute.value.meta.navbarCta);

		return {
			labels,
			logout,
			cta,
		};
	},
});
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
