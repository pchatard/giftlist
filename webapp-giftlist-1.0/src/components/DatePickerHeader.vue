<template>
	<div class="rounded flex items-center justify-between">
		<ChevronLeftIcon :class="computedLeftArrowStyle" @click.stop="previousMonth" />
		<span class="flex mx-4 gap-4 w-full">
			<span class="w-1/4" :class="computedDayStyle" @click="$emit('day')">{{
				currentDay.value
			}}</span>
			<span class="w-1/2" :class="computedMonthStyle" @click="$emit('month')">{{
				currentMonth.value
			}}</span>
			<span class="w-1/4" :class="computedYearStyle" @click="$emit('year')">{{
				currentYear.value
			}}</span>
		</span>
		<ChevronRightIcon :class="computedRightArrowStyle" @click.stop="nextMonth" />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

interface DatePickerHeader {
	value: number | string;
	isSelected: boolean;
}

interface Props {
	currentDay: DatePickerHeader;
	currentMonth: DatePickerHeader;
	currentYear: DatePickerHeader;
	disableLeftArrow: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "day"): void;
	(e: "month"): void;
	(e: "year"): void;
	(e: "previous"): void;
	(e: "next"): void;
}>();

const base =
	"py-2 bg-secondary-default text-center  text-secondary-text font-semibold cursor-pointer hover:bg-primary-light hover:text-primary-default rounded";
const selected =
	"py-2 bg-primary-default text-center  hover:bg-primary-hover text-white font-semibold cursor-pointer rounded";

const arrowBaseStyle = "h-8 w-8 hover:text-primary-default cursor-pointer";
const arrowDisabledStyle = "h-8 w-8 cursor-not-allowed text-gray-400";

const computedLeftArrowStyle = computed(() => {
	return props.disableLeftArrow ? arrowDisabledStyle : arrowBaseStyle;
});

const computedRightArrowStyle = arrowBaseStyle;

const computedDayStyle = computed(() => {
	return props.currentDay.isSelected ? selected : base;
});

const computedMonthStyle = computed(() => {
	return props.currentMonth.isSelected ? selected : base;
});
const computedYearStyle = computed(() => {
	return props.currentYear.isSelected ? selected : base;
});

const previousMonth = () => {
	emit("previous");
};
const nextMonth = () => {
	emit("next");
};
</script>
