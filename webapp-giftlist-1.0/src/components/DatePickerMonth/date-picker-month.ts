import { defineComponent } from "vue";

export default defineComponent({
	name: "DatePickerMonth",
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
