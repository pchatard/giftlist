import { defineComponent, ref, watch } from 'vue';

import InputWrapper from '@/components/InputWrapper/InputWrapper.vue';
import { TransitionRoot } from '@headlessui/vue';
import { ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "InputNumber",
	components: { ClipboardCheckIcon, ClipboardCopyIcon, TransitionRoot, InputWrapper },
	props: {
		value: {
			type: Number,
			required: true,
			default: 0,
		},
		label: {
			type: String,
			required: true,
		},
		min: {
			type: Number,
			default: 0,
			validator: (value: number) => {
				return value >= 0;
			},
		},
		max: {
			type: Number,
		},
		placeholder: {
			type: String,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
		},
		helperText: {
			type: String,
		},
		copy: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const refValue = ref(props.value);
		const selected = ref(false);
		const copied = ref(false);

		const copyToClipboard = (event: Event) => {
			const button = event.currentTarget as HTMLElement;
			const input = button.previousElementSibling as HTMLInputElement;
			input.select();
			document.execCommand("copy");
			copied.value = true;
		};

		watch(refValue, (value) => {
			if (value || value === 0) {
				context.emit("change", value);
			} else {
				refValue.value = 0;
			}
			copied.value = false;
		});

		watch(props, (value) => {
			refValue.value = value.value;
		});

		const onFocus = () => {
			selected.value = true;
		};
		const onBlur = () => {
			selected.value = false;
		};

		return {
			copied,
			copyToClipboard,
			refValue,
			onFocus,
			onBlur,
			selected,
		};
	},
	emits: ["change"],
});
