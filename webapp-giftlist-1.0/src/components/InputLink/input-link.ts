import { defineComponent, ref, watch } from "vue";

import InputWrapper from "@/components/InputWrapper/InputWrapper.vue";
import { TransitionRoot } from "@headlessui/vue";
import { ClipboardCheckIcon, ClipboardCopyIcon, XIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "InputLink",
	components: { ClipboardCopyIcon, ClipboardCheckIcon, TransitionRoot, InputWrapper, XIcon },
	props: {
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: "text",
			validator: (value: string) => {
				return ["text", "email", "password"].includes(value.toLowerCase());
			},
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
		reset: {
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
			context.emit("change", value);
			copied.value = false;
		});

		const onFocus = () => {
			selected.value = true;
		};
		const onBlur = () => {
			selected.value = false;
		};

		const onResetText = () => {
			refValue.value = "";
		};

		return {
			copied,
			copyToClipboard,
			refValue,
			onFocus,
			onBlur,
			selected,
			onResetText,
		};
	},
	emits: ["change"],
});
