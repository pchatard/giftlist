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
				text="Mes Listes"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<CollectionIconOutline class="giftlist-navbar-item-icon h-4 w-4" />
			</NavbarItem>
			<NavbarItem
				path="/app/shared"
				text="Mes listes partagées"
				:outline="true"
				class="giftlist-navbar-item"
			>
				<UserGroupIconOutline class="giftlist-navbar-item-icon h-4 w-4" />
			</NavbarItem>
		</ul>
	</div>
	<div class="flex flex-row items-center">
		<Button v-if="cta" @click="cta.action" :hasIcon="true">
			<template v-slot:icon>
				<PlusCircleIcon />
			</template>
			{{ cta.name }}
		</Button>
		<NavbarDropdown @logout="logout" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import NavbarItem from "@/components/Styled/NavbarItem.vue";
import NavbarDropdown from "./NavbarDropdown.vue";
import Button from "@/components/Styled/Button.vue";
import {
	CollectionIcon as CollectionIconOutline,
	PlusCircleIcon,
	UserGroupIcon as UserGroupIconOutline,
} from "@heroicons/vue/outline";

export default defineComponent({
	name: "LoggedInNavbar",
	components: {
		Button,
		NavbarItem,
		NavbarDropdown,
		CollectionIconOutline,
		PlusCircleIcon,
		UserGroupIconOutline,
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
