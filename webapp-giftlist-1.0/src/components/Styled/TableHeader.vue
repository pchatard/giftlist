<template>
	<th
		:scope="scope"
		class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
	>
		{{ content }}
	</th>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TableHeader",
	props: {
		scope: {
			type: String,
			default: "col",
		},
		content: {
			type: String,
			required: true,
		},
	},
});
</script>
