<template>
	<div class="mx-auto relative grid place-items-center">
		<div class="absolute z-10 bg-transparent rounded-full w-3/4 h-3/4 grid place-items-center">
			<div class="w-5/6 h-5/6 bg-white rounded-full"></div>
		</div>
		<div
			class="absolute top-0 left-1/2 bottom-1/2 right-0 bg-indigo-600 rounded-tr-full animate-spin origin-bottom-left"
		></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "GiftlistLoader",
});
</script>
