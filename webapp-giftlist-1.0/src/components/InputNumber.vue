<template>
	<InputWrapper
		:label="label"
		:is-error="isError"
		:error-message="errorMessage"
		:helper-text="helperText"
		:selected="selected"
		:copied="copied"
	>
		<template #icon>
			<slot />
		</template>
		<input
			v-model="refValue"
			type="number"
			:min="min"
			:max="max"
			step="any"
			:disabled="disabled"
			:placeholder="placeholder"
			class="outline-none px-3 py-2 flex-1"
			@focus="onFocus"
			@blur="onBlur"
		/>
		<button
			v-if="copy"
			class="relative w-8 border-l border-gray-100 hover:bg-gray-100"
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
					class="absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600"
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
import { ClipboardCheckIcon, ClipboardCopyIcon } from "@heroicons/vue/outline";

interface Props {
	value: number;
	label: string;
	min?: number;
	max?: number;
	placeholder?: string;
	disabled?: boolean;
	isError?: boolean;
	errorMessage?: string;
	helperText?: string;
	copy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	min: 0,
	max: Math.pow(10, 100),
	disabled: false,
	isError: false,
	copy: false,
	placeholder: "",
	helperText: "",
	errorMessage: "",
});

const emit = defineEmits<{
	(e: "change", value: number): void;
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
	if (value || value === 0) {
		emit("change", value);
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
</script>
