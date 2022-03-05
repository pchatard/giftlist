import { defineComponent } from 'vue';

import InputDate from '@/components/InputDate/InputDate.vue';
import InputText from '@/components/InputText/InputText.vue';
import InputToggle from '@/components/InputToggle/InputToggle.vue';

export default defineComponent({
	name: "ListFormOne",
	components: {
		InputText,
		InputDate,
		InputToggle,
	},
	props: {
		values: {
			type: Object,
		},
	},
	setup(props, context) {
		const handleTitleChange = (title: string) => {
			const values = {
				...props.values,
				title: {
					...props.values?.title,
					errorMessage: "",
					value: title,
				},
			};
			context.emit("change", values);
		};

		const handleDescriptionChange = (description: string) => {
			const values = {
				...props.values,
				description: {
					...props.values?.description,
					errorMessage: "",
					value: description,
				},
			};
			context.emit("change", values);
		};

		const handleActivateTermDateChange = (activateTermDate: boolean) => {
			const values = {
				...props.values,
				activateTermDate: {
					...props.values?.activateTermDate,
					value: activateTermDate,
				},
			};
			context.emit("change", values);
		};

		const handleTermDateChange = (termDate: string) => {
			const values = {
				...props.values,
				termDate: {
					...props.values?.termDate,
					errorMessage: "",
					value: termDate,
				},
			};
			context.emit("change", values);
		};

		return {
			handleTitleChange,
			handleDescriptionChange,
			handleActivateTermDateChange,
			handleTermDateChange,
		};
	},
	emits: ["change"],
});
