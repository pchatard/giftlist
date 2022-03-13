import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import TableData from "@/components/TableData/TableData.vue";
import labels from "@/labels/fr/labels.json";
import { CogIcon, InformationCircleIcon, TrashIcon, ViewListIcon } from "@heroicons/vue/outline";
import { ListDTO } from "@/types/dto/ListDTO";

export default defineComponent({
	name: "ListItem",
	components: {
		InformationCircleIcon,
		TableData,
		TrashIcon,
		ViewListIcon,
		CogIcon,
	},
	emits: ["delete", "details"],
	props: {
		list: {
			type: Object as PropType<ListDTO>,
			required: true,
		},
		shared: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const router = useRouter();

		return {
			router,
			labels,
		};
	},
});
