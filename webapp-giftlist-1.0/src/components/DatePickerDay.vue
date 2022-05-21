<template>
	<div
		class="rounded grid grid-cols-7 grid-rows-7 place-content-start h-full w-full gap-2 gap-y-1"
	>
		<span v-for="day in weekDays" :key="day" :class="header">{{ day }}</span>

		<div
			v-for="day in previousMonthDays"
			:key="day"
			:class="[
				grayed,
				day <= new Date()
					? 'text-gray-400 cursor-not-allowed hover:bg-secondary-hover'
					: 'text-secondary-text hover:bg-gray-300',
			]"
			@click="changeDate(day)"
		>
			{{ day.getDate() }}
		</div>
		<div
			v-for="(day, i) in monthDays"
			:key="day"
			:class="[
				compareDate(day) ? selected : base,
				i === 0 ? `col-start-${day.getDay() === 0 ? 7 : day.getDay()}` : '',
				day <= new Date()
					? `border-gray-300 hover:bg-white text-${
							compareDate(day) ? 'white' : 'gray-400'
					  } cursor-not-allowed`
					: `border-primary-lightHover text-${
							compareDate(day) ? 'white' : 'primary-default'
					  } hover:bg-primary-light hover:border-primary-light`,
			]"
			@click="changeDate(day)"
		>
			{{ day.getDate() }}
		</div>
		<div
			v-for="day in nextMonthDays"
			:key="day"
			:class="[grayed, day <= new Date() ? `border-gray-300 bg-white text-gray-400` : '']"
			@click="changeDate(day)"
		>
			{{ day.getDate() }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	currentDate: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "day", day: Date): void;
}>();

const header = "w-3/4 grid place-items-center text-secondary-text my-1 row-span-1";
const selected =
	"py-2 cursor-pointer bg-primary-default hover:bg-primary-hover border border-primary-default hover:border-primary-default text-white font-semibold rounded text-sm grid place-items-center row-span-1";
const base =
	"py-2 cursor-pointer bg-white border font-semibold rounded text-sm grid place-items-center row-span-1";
const grayed =
	"py-2 cursor-pointer bg-secondary-hover font-semibold rounded text-sm grid place-items-center row-span-1";

const weekDays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

const date = computed(() => {
	return new Date(props.currentDate);
});

const monthDays = computed(() => {
	const days = [];
	const currentDate = new Date(date.value);
	let tempDay = new Date(currentDate);
	while (tempDay.getMonth() === currentDate.getMonth()) {
		tempDay.setDate(tempDay.getDate() + 1);
		tempDay.setHours(12);
		const day = new Date(tempDay);
		days.push(day);
	}
	days.unshift(date.value);

	tempDay = new Date(currentDate);
	while (tempDay.getMonth() === currentDate.getMonth()) {
		tempDay.setDate(tempDay.getDate() - 1);
		tempDay.setHours(12);
		const day = new Date(tempDay);
		days.unshift(day);
	}
	days.splice(days.length - 1, 1);
	days.shift();

	return days;
});

const previousMonthDays = computed(() => {
	const firstMonthDay = new Date(monthDays.value[0]);
	const days = [];
	firstMonthDay.setDate(firstMonthDay.getDate() - 1);
	while (firstMonthDay.getDay() !== 0) {
		const day = new Date(firstMonthDay);
		days.unshift(day);
		firstMonthDay.setDate(firstMonthDay.getDate() - 1);
		firstMonthDay.setHours(12);
	}

	return days;
});

const nextMonthDays = computed(() => {
	const lastMonthDay = new Date(monthDays.value[monthDays.value.length - 1]);
	const days = [];
	lastMonthDay.setDate(lastMonthDay.getDate() + 1);
	while (lastMonthDay.getDay() !== 1) {
		const day = new Date(lastMonthDay);
		days.push(day);
		lastMonthDay.setDate(lastMonthDay.getDate() + 1);
		lastMonthDay.setHours(12);
	}
	return days;
});

const compareDate = (date: Date) => {
	const currentDateSplitted = props.currentDate.split("-").map((num) => parseInt(num, 10));

	return (
		date.getFullYear() === currentDateSplitted[0] &&
		date.getMonth() === currentDateSplitted[1] - 1 &&
		date.getDate() === currentDateSplitted[2]
	);
};

const changeDate = (day: Date) => {
	emit("day", day);
};
</script>
