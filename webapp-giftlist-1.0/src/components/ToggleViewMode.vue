<template>
	<div class="flex items-center">
		<ViewListIcon class="w-4" :class="isGrid ? 'text-gray-400' : 'text-indigo-600'" />

		<Switch
			v-model="isGrid"
			:class="{
				'bg-indigo-600 hover:bg-indigo-600': isGrid,
				'bg-gray-200': !isGrid,
			}"
			class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 mx-2 my-1 focus:outline-none hover:bg-gray-300"
		>
			<span
				:class="isGrid ? 'translate-x-6' : 'translate-x-1'"
				class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
			/>
		</Switch>
		<ViewGridIcon class="w-4" :class="isGrid ? 'text-indigo-600' : 'text-gray-400'" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { Switch } from "@headlessui/vue";
import { ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ToggleViewMode",
	components: {
		Switch,
		ViewGridIcon,
		ViewListIcon,
	},
	props: {
		isGridView: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, context) {
		const isGrid = ref(props.isGridView);

		watch(isGrid, (value: boolean) => {
			context.emit("change", value);
		});

		return {
			isGrid,
		};
	},
	emits: ["change"],
});
</script>
