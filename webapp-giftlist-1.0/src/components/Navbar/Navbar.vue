<template>
	<nav id="nav" class="h-full w-full px-6 flex flex-row justify-between items-center bg-white">
		<logged-in-navbar v-if="isAuthenticated" />
		<logged-out-navbar v-else />
	</nav>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import LoggedInNavbar from "./LoggedInNavbar.vue";
import LoggedOutNavbar from "./LoggedOutNavbar.vue";

export default defineComponent({
	name: "Navbar",
	components: {
		LoggedInNavbar,
		LoggedOutNavbar,
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
