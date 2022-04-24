<template>
	<InputWrapper
		:label="label"
		:is-error="isError"
		:error-message="errorMessage"
		:helper-text="helperText"
		:selected="selected"
		:copied="copied"
		:mandatory="mandatory"
	>
		<template #icon>
			<slot />
		</template>
		<input
			v-model="refValue"
			:type="type"
			:disabled="disabled"
			:placeholder="placeholder"
			class="outline-none px-3 py-2 flex-1 caret-indigo-600"
			@focus="onFocus"
			@blur="onBlur"
			:tabindex="tab"
		/>
		<XIcon
			v-if="reset"
			class="text-gray-400 hover:text-gray-500 h-5 w-5 cursor-pointer self-center mr-2"
			@click="onResetText"
		/>
		<button
			v-if="copy"
			@click="copyToClipboard"
			class="relative w-8 border-l border-gray-100 hover:bg-gray-100"
			:class="disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
		>
			<TransitionRoot
				:show="!copied"
				enter="transition-opacity duration-500  delay-200"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="transition-opacity duration-100"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<ClipboardCopyIcon
					class="absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					:class="disabled ? 'text-gray-600' : 'text-indigo-600'"
				/>
			</TransitionRoot>
			<TransitionRoot
				:show="copied"
				enter="transition-opacity duration-500 delay-200"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="transition-opacity duration-100"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<ClipboardCheckIcon
					class="absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
				/>
			</TransitionRoot>
		</button>
	</InputWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import InputWrapper from "@/components/InputWrapper.vue";
import { TransitionRoot } from "@headlessui/vue";
import { ClipboardCheckIcon, ClipboardCopyIcon, XIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "InputText",
	components: { ClipboardCopyIcon, ClipboardCheckIcon, XIcon, TransitionRoot, InputWrapper },
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
		mandatory: {
			type: Boolean,
			default: false,
		},
		tab: {
			type: Number,
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

		watch(props, (value) => {
			refValue.value = value.value;
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
</script>
