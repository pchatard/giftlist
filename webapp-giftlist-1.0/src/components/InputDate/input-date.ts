import { computed, defineComponent, ref, watch } from 'vue';

import DatePickerDay from '@/components/DatePickerDay/DatePickerDay.vue';
import DatePickerHeader from '@/components/DatePickerHeader/DatePickerHeader.vue';
import DatePickerMonth from '@/components/DatePickerMonth/DatePickerMonth.vue';
import DatePickerYear from '@/components/DatePickerYear/DatePickerYear.vue';
import InputWrapper from '@/components/InputWrapper/InputWrapper.vue';
import Modal from '@/components/Modal/Modal.vue';
import labels from '@/labels/fr/labels.json';
import { CalendarIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "InputDate",
	components: {
		CalendarIcon,
		InputWrapper,
		Modal,
		DatePickerHeader,
		DatePickerDay,
		DatePickerMonth,
		DatePickerYear,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			validator: (value: string) => {
				return /[0-9ay]{4}-[0-9m]{2}-[0-9jd]{2}/.test(value);
			},
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		helperText: {
			type: String,
		},
		errorMessage: {
			type: String,
		},
	},
	setup(props, context) {
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
			context.emit("change", value);
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

		return {
			showDatePicker,
			openModal,
			onCloseModal,
			onModalConfirm,
			selected,
			dateValue,
			onBlur,
			onFocus,
			datePickerValue,
			handleDatePickerHeaderClick,
			handleDatePickerHeaderArrowClick,
			disableLeftArrow,
			currentDay,
			currentDayHeader,
			dayIsSelected,
			monthIsSelected,
			currentMonth,
			currentMonthHeader,
			yearIsSelected,
			currentYear,
			currentYearHeader,
			monthes,
			handleDateChange,
			handleMonthChange,
			handleYearChange,
			datePickerErrorMessage,
		};
	},
	emits: ["change"],
});
