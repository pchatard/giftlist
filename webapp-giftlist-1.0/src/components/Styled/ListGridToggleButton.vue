<template>
	<div class="flex border border-indigo-600 rounded-md overflow-hidden">
		<div
			:class="{ 'bg-indigo-600': !isGridView }"
			class="flex flex-1 justify-center items-center py-3 cursor-pointer"
			@click="$emit('change')"
		>
			<ViewListIcon :class="isGridView ? 'text-indigo-600' : 'text-white'" class="h-5 w-5" />
		</div>
		<div
			:class="{ 'bg-indigo-600': isGridView }"
			class="flex flex-1 justify-center items-center py-3 cursor-pointer"
			@click="$emit('change')"
		>
			<ViewGridIcon class="h-5 w-5" :class="isGridView ? 'text-white' : 'text-indigo-600'" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ListGridToggleButton",
	components: {
		ViewGridIcon,
		ViewListIcon,
	},
	props: {
		isGridView: {
			type: Boolean,
			required: true,
		},
	},
});
</script>
