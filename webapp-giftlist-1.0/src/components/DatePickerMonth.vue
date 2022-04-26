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

<script setup lang="ts">
interface Props {
	currentMonth: string;
	monthes: string[];
}

defineProps<Props>();

const emit = defineEmits<{
	(e: "month", month: number): void;
}>();

const selected =
	"rounded py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white grid place-items-center font-semibold";
const base =
	"rounded py-2 bg-white hover:bg-indigo-100 hover:border-indigo-100 text-indigo-600 border border-indigo-200 cursor-pointer grid place-items-center";

const changeMonth = (month: number) => {
	emit("month", month);
};
</script>
