<template>
	<th
		:scope="scope"
		class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
	>
		<div class="flex items-center">
			<span :class="{ 'mr-2 cursor-pointer': sortable }" @click.stop="$emit('sort')">
				{{ content }}
			</span>
			<span class="flex" v-show="sortable && content">
				<ArrowSmUpIcon
					class="w-3 cursor-pointer"
					:class="[sorted != 'up' ? 'text-gray-300' : 'text-black']"
					@click.stop="$emit('up')"
				/>
				<ArrowSmDownIcon
					class="w-3 cursor-pointer"
					:class="[sorted != 'down' ? 'text-gray-300' : 'text-black']"
					@click.stop="$emit('down')"
				/>
			</span>
		</div>
	</th>
</template>

<script setup lang="ts">
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/outline";

interface Props {
	content: string;
	sortable?: boolean;
	sorted?: string;
	scope?: string;
}

withDefaults(defineProps<Props>(), {
	sortable: false,
	sorted: "up",
	scope: "col",
});

defineEmits<{
	(e: "sort"): void;
	(e: "up"): void;
	(e: "down"): void;
}>();
</script>
