<template>
	<nav id="nav" class="h-full w-full px-6 flex flex-row justify-between items-center bg-white">
		<logged-in-navbar v-if="loggedIn" />
		<logged-out-navbar v-else />
	</nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import LoggedInNavbar from "./LoggedInNavbar.vue";
import LoggedOutNavbar from "./LoggedOutNavbar.vue";

export default defineComponent({
	name: "Navbar",
	components: {
		LoggedInNavbar,
		LoggedOutNavbar,
	},
	setup() {
		const store = useStore();

		return {
			loggedIn: computed(() => store.state.auth.loggedIn),
		};
	},
});
</script>

<style lang="scss"></style>
