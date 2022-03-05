import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import ListFormOne from "@/components/ListFormOne/ListFormOne.vue";
import ListFormTwo from "@/components/ListFormTwo/ListFormTwo.vue";
import labels from "@/labels/fr/labels.json";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "ListSettings",
	components: {
		Button,
		ChevronUpIcon,
		DefaultLayout,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		ListFormOne,
		ListFormTwo,
	},
	setup() {
		const router = useRouter();
		const { dispatch } = useStore();

		const initializeDate = () => {
			let date = new Date();
			date.setDate(date.getDate() + 1);
			const offset = date.getTimezoneOffset();
			date = new Date(date.getTime() - offset * 60 * 1000);
			return date;
		};

		// TODO: Fill with list data
		const generalInformation = ref({
			title: {
				label: labels.listOptions.inputs.title.label,
				value: "",
				errorMessage: "",
				helperText: labels.listOptions.inputs.title.helperText,
				placeholder: labels.listOptions.inputs.title.placeholder,
				required: true,
			},
			description: {
				label: labels.listOptions.inputs.description.label,
				value: "",
				placeholder: labels.listOptions.inputs.description.placeholder,
				helperText: labels.listOptions.inputs.description.helperText,
				errorMessage: "",
				required: false,
			},
			activateTermDate: {
				value: false,
				label: labels.listOptions.inputs.activateTermDate.label,
				helperText: labels.listOptions.inputs.activateTermDate.helperText,
			},
			termDate: {
				label: labels.listOptions.inputs.termDate.label,
				value: initializeDate().toISOString().split("T")[0],
				helperText: labels.listOptions.inputs.termDate.helperText,
				errorMessage: "",
			},
		});

		// TODO: Fill with list data
		const sharingOptions = ref({
			shared: {
				value: false,
				label: labels.listOptions.inputs.shared.label,
				helperText: labels.listOptions.inputs.shared.helperText,
			},
			friends: [
				{ id: 1, name: "Arnold A." },
				{ id: 12, name: "Ben 10" },
				{ id: 13, name: "Carl Os" },
				{ id: 14, name: "Denis D." },
				{ id: 15, name: "Elliot E." },
				{ id: 25, name: "Fabrice L." },
				{ id: 54, name: "Guéric G." },
				{ id: 47, name: "Hans H." },
			],
			owners: {
				label: labels.listOptions.inputs.owners.label,
				helperText: labels.listOptions.inputs.owners.helperText,
				value: [],
			},
			authorizedUsers: {
				label: labels.listOptions.inputs.authorizedUsers.label,
				helperText: labels.listOptions.inputs.authorizedUsers.helperText,
				value: [],
			},
		});

		const openGeneral = ref(true);
		const openShare = ref(false);

		const handleOpen = (tab: string) => {
			if (tab === "general") {
				openGeneral.value = !openGeneral.value;
			} else if (tab === "share") {
				openShare.value = !openShare.value;
			}
		};

		const handleGeneralInformationChange = (values: any) => {
			generalInformation.value = values;
		};

		const handleSharingOptionsChange = (values: any) => {
			sharingOptions.value = values;
		};

		const cancel = () => {
			router.go(-1);
		};

		const saveChanges = () => {
			if (validateListData()) {
				dispatch("updateList")
					.then(() => {
						router.go(-1);
						// Update data if necessary
					})
					.catch(() => {
						// TODO
					});
			}
		};

		const validateListData = (): boolean => {
			// TODO
			const validate = true;
			return validate;
		};

		return {
			labels,
			generalInformation,
			handleGeneralInformationChange,
			handleSharingOptionsChange,
			sharingOptions,
			openGeneral,
			openShare,
			handleOpen,
			cancel,
			saveChanges,
		};
	},
});
