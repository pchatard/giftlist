<template>
	<table class="min-w-full">
		<thead>
			<tr class="sticky bg-white top-16">
				<GiftlistTableHeader
					v-for="header in headers"
					:key="header.title"
					:content="header.title"
					:sortable="header.sortable"
					:sorted="header.sorted"
					:class="header.width ? header.width : `w-1/${headers.length}`"
					@sort="handleTableHeaderClick(header)"
					@up="handleTableHeaderClick(header, 'up')"
					@down="handleTableHeaderClick(header, 'down')"
				/>
				<th scope="col" class="relative px-6 py-3" :class="`w-1/${headers.length}`">
					<span class="sr-only">Options</span>
				</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-secondary-default">
			<slot />
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { TableHeader as TableHeaderType } from "@/types/TableHeader";

import GiftlistTableHeader from "@/components/GiftlistTableHeader.vue";

interface Props {
	headers: TableHeaderType[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "sort", headers: TableHeaderType[]): void;
}>();

const handleTableHeaderClick = (
	header: TableHeaderType,
	sortType: "up" | "down" | "none" = "none"
) => {
	let headers = [...props.headers];
	const sortedHeaderId = headers.findIndex((h) => h.title === header.title);

	if (sortedHeaderId !== -1) {
		if (sortType === "none") {
			if (header.sorted === "none") header.sorted = "up";
			else if (header.sorted === "up") header.sorted = "down";
			else header.sorted = "none";
		} else {
			header.sorted = header.sorted === sortType ? "none" : sortType;
		}

		headers = headers.map((h, index) => {
			if (h.sorted && index !== sortedHeaderId) {
				h.sorted = "none";
			}
			return h;
		});
		headers.splice(sortedHeaderId, 1, header);
		emit("sort", headers);
	}
};
</script>
