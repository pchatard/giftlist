import { defineComponent, ref, watch } from "vue";

import { Switch } from "@headlessui/vue";
import { ViewGridIcon, ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "GridListToggle",
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
			isGrid
		}
	},
	emits: ["change"]
});
