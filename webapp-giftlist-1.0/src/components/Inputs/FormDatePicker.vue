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
			<input
				type="date"
				v-model="dateValue"
				class="outline-none cursor-text px-3 py-2 flex-1"
				@focus="onFocus"
				@blur="onBlur"
				:disabled="disabled"
			/>
			<span class="absolute cursor-pointer inset-y-0 right-3 flex items-center text-indigo-600">
				<CalendarIcon class="w-5 h-5" />
			</span>
		</div>
		<span class="input-helper text-xs text-gray-500" :class="{ 'text-red-600': isError }">
			{{ computedHelperText }}
		</span>
	</fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { CalendarIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "FormDatePicker",
	components: {
		CalendarIcon,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			validator: (value: string) => {
				return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(value);
			},
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		helperText: {
			type: String,
		},
		errorMessage: {
			type: String,
		},
	},
	setup(props, context) {
		const selected = ref(false);
		const dateValue = ref(props.value);

		const computedLabelClass = computed(() => {
			if (props.isError) {
				return "text-red-600";
			}
			if (selected.value) {
				return "text-indigo-600";
			}
			return "text-gray-600";
		});

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
			return "border-gray-300 hover:border-indigo-600";
		});

		const onFocus = () => {
			selected.value = true;
		};
		const onBlur = () => {
			selected.value = false;
		};

		watch(dateValue, (value: string) => {
			context.emit("change", value);
		});

		return {
			computedLabelClass,
			computedHelperText,
			computedInputBorderClass,
			dateValue,
			onBlur,
			onFocus,
		};
	},
	emits: ["change"],
});
</script>

<style lang="scss" scoped>
[type="date"]::-webkit-calendar-picker-indicator {
	display: none;
}
</style>
