import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	onUnmounted,
	ref,
	Ref,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import ListFormOne from "@/components/ListFormOne/ListFormOne.vue";
import ListFormTwo from "@/components/ListFormTwo/ListFormTwo.vue";
import labels from "@/labels/fr/labels.json";
import { ListDTO } from "@/types/dto/ListDTO";
import { PartialListDTO } from "@/types/dto/PartialListDTO";
import { EditListPayload } from "@/types/payload/EditListPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
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
		/******** Basic imports ********/
		const router = useRouter();
		const { dispatch, state, commit } = useStore();
		const auth = inject("Auth") as Auth0Client;

		/******** Static data ********/

		/******** Reactive data ********/
		const loading = ref(true);
		const openGeneral = ref(true);
		const openShare = ref(false);
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
				value: "",
				helperText: labels.listOptions.inputs.termDate.helperText,
				errorMessage: "",
			},
		});
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

		/******** Computed data ********/
		const initialList: ComputedRef<ListDTO> = computed(() => state.lists.selected);
		const editedList: ComputedRef<PartialListDTO> = computed(() => {
			const list: PartialListDTO = {
				description:
					generalInformation.value.description.value !== initialList.value.description
						? generalInformation.value.description.value
						: undefined,
				closureDate:
					generalInformation.value.activateTermDate &&
					generalInformation.value.termDate.value !== initialList.value.closureDate
						? generalInformation.value.termDate.value
						: undefined,
			};

			if (generalInformation.value.title.value !== initialList.value.title) {
				list.title = generalInformation.value.title.value;
			}

			if (generalInformation.value.description.value !== initialList.value.description) {
				list.description = generalInformation.value.description.value;
			}

			if (
				generalInformation.value.activateTermDate.value &&
				generalInformation.value.termDate.value !== initialList.value.closureDate
			) {
				list.closureDate = generalInformation.value.termDate.value;
			}

			if (!generalInformation.value.activateTermDate.value) {
				list.closureDate = null;
			}

			return list;
		});

		/******** Fetch page data ********/
		onMounted(async () => {
			const actionPayload: ListIdPayload = {
				auth,
				listId: router.currentRoute.value.params.id as string,
			};
			const success = await dispatch("getList", actionPayload);
			if (success) {
				initializeFormValues();
				loading.value = false;
			}
		});

		onUnmounted(() => {
			commit("EMPTY_LIST");
		});

		/******** Methods ********/
		const initializeDate = () => {
			let date = new Date();
			date.setDate(date.getDate() + 1);
			const offset = date.getTimezoneOffset();
			date = new Date(date.getTime() - offset * 60 * 1000);
			return date;
		};

		const initializeFormValues = () => {
			generalInformation.value.title.value = initialList.value.title;
			generalInformation.value.description.value = initialList.value.description
				? initialList.value.description
				: "";
			generalInformation.value.activateTermDate.value = initialList.value.closureDate
				? true
				: false;
			generalInformation.value.termDate.value = initialList.value.closureDate
				? new Date(initialList.value.closureDate).toISOString().split("T")[0]
				: initializeDate().toISOString().split("T")[0];
		};

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

		const saveChanges = async () => {
			if (validateListData()) {
				const editPayload: EditListPayload = {
					auth,
					listId: initialList.value.id || (router.currentRoute.value.params.id as string),
					partialList: editedList.value,
				};

				console.log(editPayload.partialList);
				const success = await dispatch("editList", editPayload);
				if (success) {
					router.go(-1);
				}
			}
		};

		const validateListData = (): boolean => {
			// TODO
			const validate = true;
			return validate;
		};

		return {
			labels,
			loading,
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
