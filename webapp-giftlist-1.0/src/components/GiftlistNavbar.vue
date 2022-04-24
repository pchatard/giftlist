<template>
	<nav id="nav" class="h-full w-full px-6 flex flex-row justify-between items-center bg-white">
		<NavbarLoggedIn v-if="isAuthenticated" />
		<NavbarLoggedOut v-else />
	</nav>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

import NavbarLoggedIn from "@/components/GiftlistNavbarLoggedIn.vue";
import NavbarLoggedOut from "@/components/GiftlistNavbarLoggedOut.vue";

export default defineComponent({
	name: "GiftlistNavbar",
	components: {
		NavbarLoggedIn,
		NavbarLoggedOut,
	},
	setup() {
		const auth = ref(inject("Auth") as any);

		const isAuthenticated = auth.value.isAuthenticated;

		return {
			isAuthenticated,
		};
	},
});
</script>
