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
			class="outline-none px-3 py-2 flex-1 caret-primary-default"
			:tabindex="tab"
			@focus="onFocus"
			@blur="onBlur"
		/>
		<XIcon
			v-if="reset"
			class="text-gray-400 hover:text-gray-500 h-5 w-5 cursor-pointer self-center mr-2"
			@click="onResetText"
		/>
		<button
			v-if="copy"
			class="relative w-8 border-l border-secondary-default hover:bg-secondary-default"
			:class="
				disabled ? 'bg-secondary-default cursor-not-allowed' : 'hover:bg-secondary-default'
			"
			@click="copyToClipboard"
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
					:class="disabled ? 'text-secondary-text' : 'text-primary-default'"
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

<script setup lang="ts">
import { ref, watch } from "vue";

import InputWrapper from "@/components/InputWrapper.vue";
import { TransitionRoot } from "@headlessui/vue";
import { ClipboardCheckIcon, ClipboardCopyIcon, XIcon } from "@heroicons/vue/outline";

interface Props {
	value: string;
	label: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	disabled?: boolean;
	isError?: boolean;
	errorMessage?: string;
	helperText?: string;
	copy?: boolean;
	reset?: boolean;
	mandatory?: boolean;
	tab?: number;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	disabled: false,
	isError: false,
	copy: false,
	reset: false,
	mandatory: false,
	placeholder: "",
	errorMessage: "",
	helperText: "",
	tab: 0,
});

const emit = defineEmits<{
	(e: "change", value: string): void;
}>();

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
	emit("change", value);
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
</script>
