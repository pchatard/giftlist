<template>
	<div class="rounded grid grid-cols-2 grid-rows-5 h-full">
		<div
			v-for="year in 10"
			:key="year"
			:class="year + startYear == currentYear ? selected : base"
			@click.stop="changeYear(year + startYear)"
		>
			{{ year + startYear }}
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	currentYear: number;
}

defineProps<Props>();

const emit = defineEmits<{
	(e: "year", year: number): void;
}>();

const selected =
	"rounded p-2 px-4 cursor-pointer bg-primary-default hover:bg-primary-hover text-white grid place-items-center m-1 font-semibold";
const base =
	"rounded p-2 px-4 bg-white hover:bg-primary-light hover:border-primary-light text-primary-default border border-primary-lightHover cursor-pointer grid place-items-center m-1";
const startYear = new Date().getFullYear() - 1;

const changeYear = (year: number) => {
	emit("year", year);
};
</script>
