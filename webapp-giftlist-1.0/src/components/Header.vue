<template>
	<header class="fixed top-0 w-screen h-16 shadow-sm flex items-center">
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
