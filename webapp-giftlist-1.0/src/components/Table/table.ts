import { defineComponent, PropType } from "vue";

import TableHeader from "@/components/TableHeader/TableHeader.vue";
import { TableHeader as TableHeaderType } from "@/types/TableHeader";

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
	setup(props, context) {
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
				context.emit("sort", headers);
			}
		};

		return {
			handleTableHeaderClick,
		};
	},
	emits: ["sort"],
});
