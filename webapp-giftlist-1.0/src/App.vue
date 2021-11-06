<template>
	<Header />
	<main class="mt-16">
		<router-view />
	</main>
	<footer></footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';

export default defineComponent({
	components: {
		Header,
	},
});
</script>

<style lang="scss"></style>
