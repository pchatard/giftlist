import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "DatePickerDay",
	components: {},
	props: {
		currentDate: {
			type: String,
			required: true,
		},
	},
	setup(props, context) {
		const header = "w-3/4 grid place-items-center text-gray-600 my-1 row-span-1";
		const selected =
			"py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-600 text-white font-semibold rounded text-sm grid place-items-center row-span-1";
		const base =
			"py-2 cursor-pointer bg-white border font-semibold rounded text-sm grid place-items-center row-span-1";
		const grayed =
			"py-2 cursor-pointer bg-gray-200 font-semibold rounded text-sm grid place-items-center row-span-1";

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
			context.emit("day", day);
		};

		return {
			weekDays,
			monthDays,
			previousMonthDays,
			nextMonthDays,
			header,
			selected,
			base,
			grayed,
			compareDate,
			changeDate,
		};
	},
	emits: ["day"],
});
