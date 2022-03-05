import { defineComponent } from 'vue';

import { XIcon } from '@heroicons/vue/outline';

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
