<template>
	<li
		class="w-full rounded-full my-1 py-4 px-4 hover:bg-gray-50"
		:class="{ 'cursor-pointer': clickable }"
	>
		<slot />
	</li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ListItem",
	props: {
		clickable: {
			type: Boolean,
			default: true,
		},
	},
});
</script>
