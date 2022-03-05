import { defineComponent } from "vue";

import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/outline";

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
	emits: ["sort", "up", "down"],
});
