<template>
	<GiftlistHeader />
	<main class="mt-16 p-8">
		<router-view />
		<GiftlistSnackbar :snack="snack" />
	</main>
	<footer></footer>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import GiftlistHeader from "@/components/GiftlistHeader.vue";
import GiftlistSnackbar from "@/components/GiftlistSnackbar.vue";

const store = useStore();

const snack = store.state.snackbar;
</script>

<style lang="scss">
@import "./scss/global.scss";
</style>
