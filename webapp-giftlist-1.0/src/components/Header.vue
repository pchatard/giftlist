<template>
	<header class="fixed top-0 z-10 w-screen h-16 flex items-center">
		<Navbar />
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar/Navbar.vue";

export default defineComponent({
	name: "Header",
	components: {
		Navbar,
	},
});
</script>
