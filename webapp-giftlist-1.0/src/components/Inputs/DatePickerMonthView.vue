<template>
	<div class="grid grid-cols-3 h-full gap-x-2 gap-y-4">
		<div
			v-for="(month, i) in monthes"
			:key="month"
			:class="month === currentMonth ? selected : base"
			@click="changeMonth(i)"
		>
			{{ month }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "DatePickerMonthView",
	props: {
		currentMonth: {
			type: String,
		},
		monthes: {
			type: Array,
		},
	},
	setup(_, context) {
		const selected =
			"rounded py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white grid place-items-center font-semibold";
		const base =
			"rounded py-2 bg-white hover:bg-indigo-100 hover:border-indigo-100 text-indigo-600 border border-indigo-200 cursor-pointer grid place-items-center";

		const changeMonth = (month: number) => {
			context.emit("month", month);
		};

		return {
			selected,
			base,
			changeMonth,
		};
	},
	emits: ["month"],
});
</script>
