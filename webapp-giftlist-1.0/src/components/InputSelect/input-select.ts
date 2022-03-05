import { defineComponent, onMounted, ref, watch } from "vue";

import {
	Listbox,
	ListboxButton,
	ListboxLabel,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "InputSelect",
	components: {
		Listbox,
		ListboxLabel,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		CheckIcon,
		SelectorIcon,
	},
	props: {
		value: {
			type: Object,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
		writable: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
		},
		label: {
			type: String,
			required: true,
		},
		helperText: {
			type: String,
		},
	},
	setup(props, context) {
		const selectedOption = ref(props.value);
		const openWithInput = ref(false);
		const inputSelect = ref(props.value.name);
		const filteredOptions = ref(props.options);

		watch(selectedOption, (value) => {
			if (selectedOption.value.id) {
				inputSelect.value = value.name;
				context.emit("change", value);
			}
		});

		watch(props, (value) => {
			filteredOptions.value = value.options;
			inputSelect.value = "";
			selectedOption.value = value.value;
		});

		const openOrHideOptions = () => {
			openWithInput.value = inputSelect.value ? true : false;
			filterOptions(inputSelect.value);
		};

		const filterOptions = (queryFilter: string) => {
			if (!queryFilter) {
				filteredOptions.value = props.options;
				return;
			}
			filteredOptions.value = props.options.filter((opt: any) => {
				return opt.name.includes(queryFilter);
			});
		};

		onMounted(() => {
			window.addEventListener("click", () => {
				openWithInput.value = false;
			});
		});

		return {
			inputSelect,
			openOrHideOptions,
			openWithInput,
			selectedOption,
			filteredOptions,
		};
	},
	emits: ["change"],
});
