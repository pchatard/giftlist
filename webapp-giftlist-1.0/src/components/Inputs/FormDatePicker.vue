<template>
	<FormWrapper
		:label="label"
		:isError="isError"
		:errorMessage="errorMessage"
		:helperText="helperText"
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
	</FormWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { CalendarIcon } from "@heroicons/vue/outline";
import FormWrapper from "@/components/Inputs/FormWrapper.vue";

export default defineComponent({
	name: "FormDatePicker",
	components: {
		CalendarIcon,
		FormWrapper,
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
