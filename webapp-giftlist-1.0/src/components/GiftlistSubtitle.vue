<template>
	<h2 class="font-bold text-2xl">
		<slot />
	</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "GiftlistSubtitle",
});
</script>
