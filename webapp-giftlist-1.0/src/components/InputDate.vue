<template>
	<InputWrapper
		:label="label"
		:is-error="isError"
		:error-message="errorMessage"
		:selected="selected"
		:helper-text="helperText"
	>
		<template #icon>
			<slot />
		</template>
		<input
			type="date"
			autocomplete="off"
			v-model="dateValue"
			class="outline-none cursor-text px-3 py-2 flex-1"
			@focus="onFocus"
			@blur="onBlur"
			:disabled="disabled"
		/>
		<button
			@click="openModal"
			:disabled="disabled"
			class="relative w-8 border-l border-gray-100"
			:class="disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'"
		>
			<CalendarIcon
				class="absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				:class="disabled ? 'text-gray-600' : 'text-indigo-600'"
			/>
		</button>
		<GiftlistModal
			:show="showDatePicker"
			:title="label"
			confirm-text="Confirmer"
			cancel-text="Annuler"
			@close="onCloseModal"
			@confirm="onModalConfirm"
		>
			<div class="p-4 px-8 flex flex-col items-stretch gap-y-4">
				<DatePickerHeader
					:current-day="currentDayHeader"
					:current-month="currentMonthHeader"
					:current-year="currentYearHeader"
					:disable-left-arrow="disableLeftArrow"
					@previous="handleDatePickerHeaderArrowClick('previous')"
					@day="handleDatePickerHeaderClick('day')"
					@month="handleDatePickerHeaderClick('month')"
					@year="handleDatePickerHeaderClick('year')"
					@next="handleDatePickerHeaderArrowClick('next')"
				/>
			</div>
			<div class="h-72 px-8">
				<DatePickerDay
					v-show="!yearIsSelected && !monthIsSelected"
					:current-date="datePickerValue"
					@day="handleDateChange"
				/>
				<DatePickerMonth
					v-show="monthIsSelected"
					:current-month="currentMonth"
					:monthes="monthes"
					@month="handleMonthChange"
				/>
				<DatePickerYear
					v-show="yearIsSelected"
					:current-year="currentYear"
					@year="handleYearChange"
				/>
			</div>
		</GiftlistModal>
	</InputWrapper>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import labels from "@/labels/fr/labels.json";

import DatePickerDay from "@/components/DatePickerDay.vue";
import DatePickerHeader from "@/components/DatePickerHeader.vue";
import DatePickerMonth from "@/components/DatePickerMonth.vue";
import DatePickerYear from "@/components/DatePickerYear.vue";
import InputWrapper from "@/components/InputWrapper.vue";
import GiftlistModal from "@/components/GiftlistModal.vue";

import { CalendarIcon } from "@heroicons/vue/outline";

interface Props {
	label: string;
	value: string;
	disabled?: boolean;
	isError?: boolean;
	helperText: string;
	errorMessage: string;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	isError: false,
});

const emit = defineEmits<{
	(e: "change", value: string): void;
}>();

const selected = ref(false);
const dateValue = ref(props.value);

const showDatePicker = ref(false);
const datePickerValue = ref(dateValue.value);

const dayIsSelected = ref(true);
const monthIsSelected = ref(false);
const yearIsSelected = ref(false);
const monthes = [
	labels.inputs.datePicker.monthes.january,
	labels.inputs.datePicker.monthes.february,
	labels.inputs.datePicker.monthes.march,
	labels.inputs.datePicker.monthes.april,
	labels.inputs.datePicker.monthes.may,
	labels.inputs.datePicker.monthes.june,
	labels.inputs.datePicker.monthes.july,
	labels.inputs.datePicker.monthes.august,
	labels.inputs.datePicker.monthes.september,
	labels.inputs.datePicker.monthes.october,
	labels.inputs.datePicker.monthes.november,
	labels.inputs.datePicker.monthes.december,
];
const datePickerErrorMessage = ref("");

const currentDay = computed(() => {
	return parseInt(datePickerValue.value.split("-")[2]);
});

const currentDayHeader = computed(() => {
	return {
		value: currentDay.value,
		isSelected: dayIsSelected.value,
	};
});

const currentMonth = computed(() => {
	return monthes[parseInt(datePickerValue.value.split("-")[1]) - 1];
});

const currentMonthHeader = computed(() => {
	return {
		value: currentMonth.value,
		isSelected: monthIsSelected.value,
	};
});

const currentYear = computed(() => {
	return parseInt(datePickerValue.value.split("-")[0]);
});

const currentYearHeader = computed(() => {
	return {
		value: currentYear.value,
		isSelected: yearIsSelected.value,
	};
});

const disableLeftArrow = computed(() => {
	const date = new Date();
	const month = monthes[parseInt(date.toISOString().split("-")[1]) - 1];
	const year = date.getFullYear();

	return month === currentMonth.value && year === currentYear.value;
});

const handleDatePickerHeaderClick = (type: "day" | "month" | "year") => {
	if (type === "month") {
		monthIsSelected.value = !monthIsSelected.value;
		yearIsSelected.value = false;
		dayIsSelected.value = false;
	} else if (type === "year") {
		yearIsSelected.value = !yearIsSelected.value;
		monthIsSelected.value = false;
		dayIsSelected.value = false;
	} else {
		dayIsSelected.value = true;
		monthIsSelected.value = false;
		yearIsSelected.value = false;
	}
};

const handleDatePickerHeaderArrowClick = (direction: "previous" | "next") => {
	let date = new Date(datePickerValue.value);
	date.setHours(12);

	if (direction === "previous") {
		date.setMonth(date.getMonth() - 1);
		if (date < new Date()) {
			date = new Date();
			date.setDate(date.getDate() + 1);
		}
	} else {
		date.setDate(1);
		date.setMonth(date.getMonth() + 1);
	}

	handleDateChange(date);
};

const onFocus = () => {
	selected.value = true;
};
const onBlur = () => {
	selected.value = false;
};

const openModal = () => {
	datePickerValue.value = dateValue.value;
	showDatePicker.value = true;
};

const onCloseModal = () => {
	showDatePicker.value = false;
};

const onModalConfirm = () => {
	dateValue.value = datePickerValue.value;
	showDatePicker.value = false;
};

watch(dateValue, (value: string) => {
	emit("change", value);
});

watch(props, (value) => {
	dateValue.value = value.value;
});

const handleDateChange = (day: Date) => {
	if (day >= new Date()) {
		datePickerValue.value = day.toISOString().split("T")[0];
	}
};

const handleMonthChange = (month: number) => {
	let date = new Date(datePickerValue.value);
	date.setHours(12);
	date.setMonth(month);
	if (date >= new Date()) {
		datePickerValue.value = date.toISOString().split("T")[0];
	} else {
		date = new Date();
		date.setDate(date.getDate() + 1);
		date.setHours(12);
		datePickerValue.value = date.toISOString().split("T")[0];
	}
	handleDatePickerHeaderClick("day");
};

const handleYearChange = (year: number) => {
	let date = new Date(datePickerValue.value);
	date.setHours(12);
	date.setFullYear(year);
	if (date >= new Date()) {
		datePickerValue.value = date.toISOString().split("T")[0];
	} else {
		date = new Date();
		date.setDate(date.getDate() + 1);
		date.setHours(12);
		datePickerValue.value = date.toISOString().split("T")[0];
	}
	handleDatePickerHeaderClick("month");
};
</script>

<style lang="scss" scoped>
[type="date"]::-webkit-calendar-picker-indicator {
	display: none;
}
</style>
