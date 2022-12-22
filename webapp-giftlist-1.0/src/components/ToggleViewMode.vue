<template>
	<div class="flex items-center">
		<ViewListIcon class="w-4" :class="isGrid ? 'text-gray-400' : 'text-primary-default'" />

		<Switch
			v-model="isGrid"
			:class="{
				'bg-primary-default hover:bg-primary-default': isGrid,
				'bg-secondary-hover': !isGrid,
			}"
			class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 mx-2 my-1 focus:outline-none hover:bg-gray-300"
		>
			<span
				:class="isGrid ? 'translate-x-6' : 'translate-x-1'"
				class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
			/>
		</Switch>
		<ViewGridIcon class="w-4" :class="isGrid ? 'text-primary-default' : 'text-gray-400'" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { Switch } from "@headlessui/vue";
import { ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";

interface Props {
	isGridView: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "change", isGridView: boolean): void;
}>();

const isGrid = ref(props.isGridView);

watch(isGrid, (value: boolean) => {
	emit("change", value);
});
</script>
