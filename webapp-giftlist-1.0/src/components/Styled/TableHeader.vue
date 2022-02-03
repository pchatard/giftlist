<template>
	<th
		:scope="scope"
		class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
	>
		<div class="flex items-center">
			<span :class="{ 'mr-2 cursor-pointer': sortable }">
				{{ content }}
			</span>
			<span class="flex" v-show="sortable && content">
				<ArrowSmUpIcon
					class="w-3 cursor-pointer"
					:class="[sorted != 'up' ? 'text-gray-300' : 'text-black']"
				/>
				<ArrowSmDownIcon
					class="w-3 cursor-pointer"
					:class="[sorted != 'down' ? 'text-gray-300' : 'text-black']"
				/>
			</span>
		</div>
	</th>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "TableHeader",
	components: {
		ArrowSmDownIcon,
		ArrowSmUpIcon,
	},
	props: {
		sortable: {
			type: Boolean,
			default: false,
		},
		sorted: {
			type: String,
			default: "up",
		},
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
