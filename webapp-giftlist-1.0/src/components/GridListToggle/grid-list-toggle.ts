import { defineComponent } from 'vue';

import { ViewGridIcon, ViewListIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "GridListToggle",
	components: {
		ViewGridIcon,
		ViewListIcon,
	},
	props: {
		isGridView: {
			type: Boolean,
			required: true,
		},
	},
});
