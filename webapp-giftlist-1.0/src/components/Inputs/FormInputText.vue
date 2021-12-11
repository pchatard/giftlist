<template>
	<fieldset class="flex flex-col items-start transition-all">
		<label class="text-sm font-semibold transition-all" :class="computedLabelClass">
			{{ label }}
		</label>
		<input
			v-model="refValue"
			:type="type"
			:disabled="disabled"
			:placeholder="placeholder"
			class="outline-none border rounded-md px-3 py-2 my-1 w-full"
			:class="computedInputBorderClass"
			@focus="onFocus"
			@blur="onBlur"
		/>
		<span class="input-helper text-xs text-gray-500" :class="{ 'text-red-600': isError }">
			{{ computedHelperText }}
		</span>
	</fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
	name: "FormInputText",
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
	},
	setup(props, context) {
		const refValue = ref(props.value);
		const selected = ref(false);

		const computedHelperText = computed(() => {
			if (props.isError) {
				return props.errorMessage;
			}
			if (selected.value) {
				return props.helperText;
			}
			return "\xa0";
		});

		const computedInputBorderClass = computed(() => {
			if (props.isError) {
				return "border-red-600";
			}
			if (selected.value) {
				return "border-indigo-600";
			}
			return "border-gray-300";
		});

		const computedLabelClass = computed(() => {
			if (props.isError) {
				return "text-red-600";
			}
			if (selected.value) {
				return "text-indigo-600";
			}
			return "text-gray-600";
		});

		watch(refValue, (value) => {
			context.emit("change", value);
		});

		const onFocus = () => {
			selected.value = true;
		};
		const onBlur = () => {
			selected.value = false;
		};

		return {
			refValue,
			onFocus,
			onBlur,
			selected,
			computedLabelClass,
			computedHelperText,
			computedInputBorderClass,
		};
	},
	emits: ["change"],
});
</script>
