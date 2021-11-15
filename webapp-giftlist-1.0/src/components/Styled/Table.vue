<template>
	<table class="min-w-full">
		<thead>
			<tr>
				<TableHeader
					v-for="header in headers"
					:key="header"
					:content="header"
					:class="`w-1/${headers.length}`"
				/>
				<th scope="col" class="relative px-6 py-3" :class="`w-1/${headers.length}`">
					<span class="sr-only">Options</span>
				</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-100">
			<slot />
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TableHeader from "./TableHeader.vue";

export default defineComponent({
	name: "Table",
	components: {
		TableHeader,
	},
	props: {
		headers: {
			type: Array as PropType<string[]>,
			required: true,
		},
	},
});
</script>
