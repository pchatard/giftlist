<template>
	<GiftlistHeader />
	<main class="mt-16 p-8">
		<router-view />
		<GiftlistSnackbar :snack="snack" />
	</main>
	<footer></footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import GiftlistHeader from "@/components/GiftlistHeader.vue";
import GiftlistSnackbar from "@/components/GiftlistSnackbar.vue";

export default defineComponent({
	components: {
		GiftlistHeader,
		GiftlistSnackbar,
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
