<template>
	<table class="min-w-full">
		<thead>
			<tr class="sticky bg-white top-16">
				<TableHeader
					v-for="header in headers"
					:key="header.title"
					:content="header.title"
					:sortable="header.sortable"
					:sorted="testSort"
					:class="header.width ? header.width : `w-1/${headers.length}`"
					@click.stop="handleTableHeaderClick(header)"
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
import { defineComponent, PropType, ref } from "vue";
import { TableHeader as TableHeaderType } from "@/types/TableHeader";

import TableHeader from "./TableHeader.vue";

export default defineComponent({
	name: "Table",
	components: {
		TableHeader,
	},
	props: {
		headers: {
			type: Array as PropType<TableHeaderType[]>,
			required: true,
		},
	},
	setup() {
		const testSort = ref("none");

		const handleTableHeaderClick = (header: TableHeaderType) => {
			if (testSort.value === "none") testSort.value = "up";
			else if (testSort.value === "up") testSort.value = "down";
			else testSort.value = "none";
		};

		return {
			handleTableHeaderClick,
			testSort,
		};
	},
});
</script>
