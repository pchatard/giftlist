<template>
	<div class="flex flex-row items-center">
		<router-link to="/app">
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
		<NavbarDropdown :fullname="fullname" @logout="logout" />
	</div>
</template>

<script lang="ts">
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { computed, defineComponent } from "vue";
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
	setup(props, context) {
		const { getters, dispatch } = useStore();
		const router = useRouter();
		const currentRoute = router.currentRoute;

		console.log(context.slots);

		const logout = async () => {
			const snack: SnackbarState = {
				message: "",
				type: SnackbarEventEnum.ERROR,
			};

			dispatch("logout")
				.then(() => {
					console.debug("LoggedInNavbar - logout - Logout successful");
					console.debug("LoggedInNavbar - logout - Redirecting to homepage");
					router.push("/");

					snack.message = "Déconnection réussie";
					snack.type = SnackbarEventEnum.SUCCESS;
				})
				.catch((error: Error) => {
					console.error(error.message);
					snack.message = error.message;
				})
				.finally(() => {
					dispatch("showSnackbar", snack);
				});
		};

		return {
			fullname: computed(() => getters.fullName),
			logout,
			cta: computed(() => currentRoute.value.meta.navbarCta),
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
