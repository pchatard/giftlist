import { defineComponent } from "vue";

export default defineComponent({
	name: "DatePickerYear",
	props: {
		currentYear: {
			type: Number,
		},
	},
	setup(_, context) {
		const selected =
			"rounded p-2 px-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white grid place-items-center m-1 font-semibold";
		const base =
			"rounded p-2 px-4 bg-white hover:bg-indigo-100 hover:border-indigo-100 text-indigo-600 border border-indigo-200 cursor-pointer grid place-items-center m-1";
		const startYear = new Date().getFullYear() - 1;

		const changeYear = (year: number) => {
			context.emit("year", year);
		};

		return {
			startYear,
			selected,
			base,
			changeYear,
		};
	},
	emits: ["year"],
});
