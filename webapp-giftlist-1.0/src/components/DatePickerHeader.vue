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

<script lang="ts">
import { computed, defineComponent } from "vue";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "DatePickerHeader",
	components: {
		ChevronLeftIcon,
		ChevronRightIcon,
	},
	props: {
		currentDay: { type: Object, required: true },
		currentMonth: { type: Object, required: true },
		currentYear: { type: Object, required: true },
		disableLeftArrow: { type: Boolean, required: true },
	},
	setup(props, context) {
		const base =
			"py-2 bg-gray-100 text-center  text-gray-600 font-semibold cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded";
		const selected =
			"py-2 bg-indigo-600 text-center  hover:bg-indigo-700 text-white font-semibold cursor-pointer rounded";

		const arrowBaseStyle = "h-8 w-8 hover:text-indigo-600 cursor-pointer";
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
			context.emit("previous");
		};
		const nextMonth = () => {
			context.emit("next");
		};

		return {
			computedLeftArrowStyle,
			computedRightArrowStyle,
			computedDayStyle,
			computedMonthStyle,
			computedYearStyle,
			previousMonth,
			nextMonth,
		};
	},
	emits: ["day", "month", "year", "previous", "next"],
});
</script>
