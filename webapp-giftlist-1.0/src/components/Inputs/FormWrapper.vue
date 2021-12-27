<template>
	<fieldset class="flex flex-col items-start transition-all">
		<label class="text-sm font-semibold transition-all" :class="computedLabelClass">
			{{ label }}
		</label>
		<div
			class="
				input-container
				relative
				flex
				items-stretch
				overflow-hidden
				border
				rounded-md
				my-1
				w-full
			"
			:class="computedInputBorderClass"
		>
			<slot />
		</div>
		<span class="input-helper text-xs text-gray-500" :class="{ 'text-red-600': isError }">
			{{ computedHelperText }}
		</span>
	</fieldset>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "FormWrapper",
	props: {
		isError: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
		},
		helperText: {
			type: String,
		},
		label: {
			type: String,
			required: true,
		},
		copied: {
			type: Boolean,
			required: false,
		},
	},
	setup(props) {
		const computedLabelClass = computed(() => {
			if (props.isError) {
				return "text-red-600";
			}
			if (props.selected) {
				return "text-indigo-600";
			}
			return "text-gray-600";
		});

		const computedInputBorderClass = computed(() => {
			if (props.isError) {
				return "border-red-600";
			}
			if (props.selected) {
				return "border-indigo-600";
			}
			return "border-gray-300 hover:border-indigo-600";
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

		return {
			computedLabelClass,
			computedInputBorderClass,
			computedHelperText,
		};
	},
});
</script>
