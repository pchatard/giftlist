import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "InputWrapper",
	props: {
		isError: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
		},
		helperText: {
			type: String,
		},
		label: {
			type: String,
			required: true,
		},
		copied: {
			type: Boolean,
			required: false,
		},
		mandatory: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const computedLabelClass = computed(() => {
			if (props.isError) {
				return "text-red-600";
			}
			if (props.selected) {
				return "text-indigo-600";
			}
			return "text-gray-600";
		});

		const computedInputBorderClass = computed(() => {
			if (props.isError) {
				return "border-red-600";
			}
			if (props.selected) {
				return "border-indigo-600";
			}
			return "border-gray-300 hover:border-indigo-600";
		});

		const computedHelperText = computed(() => {
			if (props.copied && props.selected) {
				return "Copié dans le presse-papiers";
			}
			if (props.isError) {
				return props.errorMessage;
			}
			if (props.selected) {
				return props.helperText;
			}
			return "\xa0";
		});

		return {
			computedLabelClass,
			computedInputBorderClass,
			computedHelperText,
		};
	},
});
