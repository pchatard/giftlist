<template>
	<fieldset class="flex items-center">
		<slot name="icon" />
		<div class="flex flex-col items-start transition-all flex-1">
			<label class="text-sm font-semibold transition-all" :class="computedLabelClass">
				{{ label }}
				<span v-if="mandatory" class="text-danger-default">*</span>
			</label>
			<div
				class="input-container relative flex items-stretch overflow-hidden border rounded-md my-1 w-full"
				:class="computedInputBorderClass"
			>
				<slot />
			</div>
			<span
				class="input-helper text-xs text-gray-500"
				:class="{ 'text-danger-default': isError }"
			>
				{{ computedHelperText }}
			</span>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	label: string;
	isError?: boolean;
	selected?: boolean;
	errorMessage?: string;
	helperText?: string;
	copied?: boolean;
	mandatory?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	isError: false,
	selected: false,
	copied: false,
	mandatory: false,
	errorMessage: "",
	helperText: "",
});

const computedLabelClass = computed(() => {
	if (props.isError) {
		return "text-danger-default";
	}
	if (props.selected) {
		return "text-primary-default";
	}
	return "text-secondary-text";
});

const computedInputBorderClass = computed(() => {
	if (props.isError) {
		return "border-danger-default";
	}
	if (props.selected) {
		return "border-primary-default";
	}
	return "border-gray-300 hover:border-primary-default";
});

const computedHelperText = computed(() => {
	if (props.copied && props.selected) {
		return "Copié dans le presse-papiers";
	}
	if (props.isError) {
		return props.errorMessage;
	}
	if (props.selected) {
		return props.helperText;
	}
	return "\xa0";
});
</script>
