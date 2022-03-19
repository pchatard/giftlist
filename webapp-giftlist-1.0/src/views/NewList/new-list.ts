import { computed, ComputedRef, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import ListFormOne from "@/components/ListFormOne/ListFormOne.vue";
import ListFormTwo from "@/components/ListFormTwo/ListFormTwo.vue";
import Subtitle from "@/components/Subtitle/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import { CreateListDTO } from "@/types/dto/CreateListDTO";
import { CreateListPayload } from "@/types/payload/CreateListPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "NewList",
	components: {
		Button,
		Subtitle,
		DefaultLayout,
		ListFormOne,
		ListFormTwo,
		XIcon,
		CheckIcon,
		ArrowLeftIcon,
		ArrowRightIcon,
	},
	setup() {
		/******** Basic imports ********/
		const router = useRouter();
		const { dispatch } = useStore();
		const auth = inject("Auth") as Auth0Client;

		/******** Static data ********/
		const formLabels = labels.newList;
		const maxStep = 2;

		const getInitDate = (): Date => {
			const date = new Date();
			date.setDate(date.getDate() + 1);
			const offset = date.getTimezoneOffset();
			return new Date(date.getTime() - offset * 60 * 1000);
		};

		/******** Reactive data ********/
		const step = ref(1);
		const listInformation = ref({
			step1: {
				title: {
					label: formLabels.step1.inputs.title.label,
					value: "",
					errorMessage: "",
					helperText: formLabels.step1.inputs.title.helperText,
					placeholder: formLabels.step1.inputs.title.placeholder,
					required: true,
				},
				description: {
					label: formLabels.step1.inputs.description.label,
					value: "",
					placeholder: formLabels.step1.inputs.description.placeholder,
					helperText: formLabels.step1.inputs.description.helperText,
					errorMessage: "",
					required: false,
				},
				activateTermDate: {
					value: true,
					label: formLabels.step1.inputs.activateTermDate.label,
					helperText: formLabels.step1.inputs.activateTermDate.helperText,
				},
				termDate: {
					label: formLabels.step1.inputs.termDate.label,
					value: getInitDate().toISOString().split("T")[0],
					helperText: formLabels.step1.inputs.termDate.label,
					errorMessage: "",
				},
			},
			step2: {
				shared: {
					value: false,
					label: formLabels.step2.inputs.shared.label,
					helperText: formLabels.step2.inputs.shared.helperText,
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
					label: formLabels.step2.inputs.owners.label,
					helperText: formLabels.step2.inputs.owners.helperText,
					value: [],
				},
				authorizedUsers: {
					label: formLabels.step2.inputs.authorizedUsers.label,
					helperText: formLabels.step2.inputs.authorizedUsers.helperText,
					value: [],
				},
			},
		});

		/******** Computed data ********/
		const currentComponent = computed(() => {
			switch (step.value) {
				case 1:
					return "ListFormOne";
				case 2:
					return "ListFormTwo";
				default:
					return "ListFormOne";
			}
		});

		const createListData: ComputedRef<CreateListDTO> = computed(() => {
			const list: CreateListDTO = {
				title: listInformation.value.step1.title.value,
				description: listInformation.value.step1.description.value
					? listInformation.value.step1.description.value
					: undefined,
				closureDate: listInformation.value.step1.activateTermDate.value
					? listInformation.value.step1.termDate.value
					: undefined,
				ownersIds: listInformation.value.step2.owners.value,
				isShared: listInformation.value.step2.shared.value,
				grantedUsersIds: listInformation.value.step2.shared
					? listInformation.value.step2.authorizedUsers.value
					: undefined,
			};
			return list;
		});

		const nextButtonText = computed(() => {
			if (step.value === 1) {
				return formLabels.buttons.next.step2;
			}
			switch (step.value) {
				case 1:
					return formLabels.buttons.next.step2;
				default:
					return formLabels.buttons.next.default;
			}
		});

		const stepTitle = computed(() => {
			switch (step.value) {
				case 1:
					return formLabels.step1.title;
				case 2:
					return formLabels.step2.title;
				default:
					return "";
			}
		});

		/******** Fetch page data ********/
		// TODO: Fetch friends here

		/******** Methods ********/
		const cancel = () => {
			router.push("/app/lists");
		};

		const createList = async () => {
			// TODO: Make verifications

			// Call Store action
			const payload: CreateListPayload = {
				auth,
				newList: createListData.value,
			};
			const success = await dispatch("createList", payload);
			if (success) {
				router.push("/app/lists");
			}
		};

		const handleChangeStepFromStepper = (newStep: number) => {
			if (checkStep(newStep - 1)) {
				step.value = newStep;
			}
		};

		const handleListInformationChange = (values: any) => {
			switch (step.value) {
				case 1:
					listInformation.value.step1 = values;
					return;
				case 2:
					listInformation.value.step2 = values;
					return;
				default:
					return;
			}
		};

		const nextAction = () => {
			if (step.value !== maxStep) {
				if (checkStep(step.value)) {
					step.value++;
				}
				return;
			} else {
				router.push("/app/lists");
			}
		};

		const checkStep = (step: number): boolean => {
			switch (step) {
				case 1:
					return checkStep1();
				case 2:
					return checkStep2();
				default:
					return false;
			}
		};

		const checkStep1 = (): boolean => {
			let validateStep1 = true;
			// Check that title is filled
			if (!listInformation.value.step1.title.value) {
				listInformation.value.step1.title.errorMessage =
					formLabels.step1.inputs.title.errors.mandatory;
				validateStep1 = false;
			}

			// Check that date is not in the past
			const dateIsInPast = new Date(listInformation.value.step1.termDate.value) <= new Date();
			if (dateIsInPast) {
				listInformation.value.step1.termDate.errorMessage =
					formLabels.step1.inputs.termDate.errors.pastDate;
				validateStep1 = false;
			}

			return validateStep1;
		};

		const checkStep2 = (): boolean => {
			const validateStep2 = true;
			return validateStep2;
		};

		return {
			labels,
			formLabels,
			cancel,
			currentComponent,
			handleChangeStepFromStepper,
			step,
			stepTitle,
			nextAction,
			nextButtonText,
			maxStep,
			createList,
			listInformation,
			handleListInformationChange,
		};
	},
});
