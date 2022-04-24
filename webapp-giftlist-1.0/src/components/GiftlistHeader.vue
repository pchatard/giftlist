<template>
	<header class="fixed top-0 z-10 w-screen h-16 flex items-center">
		<GiftlistNavbar />
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GiftlistNavbar from "@/components/GiftlistNavbar.vue";

export default defineComponent({
	name: "GiftlistHeader",
	components: {
		GiftlistNavbar,
	},
});
</script>
