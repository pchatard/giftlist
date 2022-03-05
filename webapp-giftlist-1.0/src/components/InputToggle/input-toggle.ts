import { defineComponent, ref, watch } from 'vue';

import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

export default defineComponent({
	name: "InputToggle",
	components: {
		SwitchGroup,
		Switch,
		SwitchLabel,
	},
	props: {
		value: {
			type: Boolean,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		helperText: {
			type: String,
		},
		inline: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const refValue = ref(props.value);

		watch(refValue, (value: boolean) => {
			context.emit("change", value);
		});

		return {
			refValue,
		};
	},
	emits: ["change"],
});
