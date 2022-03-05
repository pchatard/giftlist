import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import labels from '@/labels/fr/labels.json';
import { SnackbarState } from '@/store/snackbar';

export default defineComponent({
	name: "Snackbar",
	props: {
		snack: {
			type: Object as PropType<SnackbarState>,
			required: true,
		},
	},
	setup() {
		const { dispatch } = useStore();

		const hideSnackbar = () => {
			dispatch("hideSnackbar");
		};

		return {
			labels,
			hideSnackbar,
		};
	},
});
