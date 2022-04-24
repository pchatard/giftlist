<template>
	<span class="flex items-center justify-around bg-indigo-100 px-3 py-2 rounded-md">
		<span class="text-indigo-600 text-sm">
			{{ text }}
		</span>
		<XIcon
			v-if="!hideDelete"
			class="p-1 h-6 w-6 ml-2 hover:bg-indigo-200 rounded-full text-indigo-600 cursor-pointer"
			@click="$emit('delete')"
		/>
	</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { XIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "PersonTag",
	props: {
		text: {
			type: String,
			required: true,
		},
		hideDelete: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		XIcon,
	},
	setup() {
		return {};
	},
	emits: ["delete"],
});
</script>
