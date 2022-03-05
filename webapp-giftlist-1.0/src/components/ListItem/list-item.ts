import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

import TableData from '@/components/TableData/TableData.vue';
import labels from '@/labels/fr/labels.json';
import { List } from '@/types/api/List';
import { CogIcon, InformationCircleIcon, TrashIcon, ViewListIcon } from '@heroicons/vue/outline';

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
			type: Object as PropType<List>,
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
