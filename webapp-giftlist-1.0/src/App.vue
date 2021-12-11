<template>
	<Header />
	<main class="mt-16 p-8">
		<router-view />
		<Snackbar :snack="snack" />
	</main>
	<footer></footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import Snackbar from "./components/Snackbar/Snackbar.vue";

export default defineComponent({
	components: {
		Header,
		Snackbar,
	},
	setup() {
		const store = useStore();

		const snack = store.state.snackbar;

		return {
			snack,
		};
	},
});
</script>

<style lang="scss">
@import "./scss/global.scss";
</style>
