<template>
	<h1 class="font-bold text-4xl">
		<slot />
	</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Title",
});
</script>
