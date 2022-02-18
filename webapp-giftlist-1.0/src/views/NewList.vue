<template>
	<DefaultLayout :title="labels.titles.newList" back>
		<div class="flex flex-col">
			<div class="relative my-4 flex flex-col border rounded-lg">
				<Subtitle class="absolute top-0 left-4 transform -translate-y-1/2 bg-white px-4">
					{{ stepTitle }}
				</Subtitle>

				<component
					class="p-4 my-4 rounded-md"
					:is="currentComponent"
					:values="listInformation['step' + step]"
					@change="handleListInformationChange"
				>
				</component>
			</div>

			<div class="flex justify-between">
				<div class="flex gap-4">
					<Button btnStyle="danger" hasIcon @click="cancel">
						<template v-slot:icon>
							<XIcon />
						</template>
						{{ labels.newList.buttons.cancel }}
					</Button>
					<Button btnStyle="secondary" hasIcon v-show="step > 1" @click="step--">
						<template v-slot:icon>
							<ArrowLeftIcon />
						</template>
						{{ labels.newList.buttons.previous }}
					</Button>
				</div>
				<div class="flex gap-4">
					<Button
						:btnStyle="step === maxStep ? 'primary' : 'secondary'"
						hasIcon
						@click="skipToList"
					>
						<template v-slot:icon>
							<CheckIcon />
						</template>
						{{ labels.newList.buttons.confirm }}
					</Button>
					<Button btnStyle="primary" hasIcon v-show="step != maxStep" @click="nextAction">
						<template v-slot:icon>
							<ArrowRightIcon />
						</template>
						{{ nextButtonText }}
					</Button>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import labels from "@/labels/fr/labels.json";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListFormStep1 from "@/components/List/ListFormStep1.vue";
import ListFormStep2 from "@/components/List/ListFormStep2.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";
import { XIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";

export default defineComponent({
	name: "NewList",
	components: {
		Button,
		Subtitle,
		DefaultLayout,
		ListFormStep1,
		ListFormStep2,
		XIcon,
		CheckIcon,
		ArrowLeftIcon,
		ArrowRightIcon,
	},
	setup() {
		const router = useRouter();
		const { dispatch } = useStore();

		const step = ref(1);
		const maxStep = 2;
		const currentComponent = computed(() => {
			switch (step.value) {
				case 1:
					return "ListFormStep1";
				case 2:
					return "ListFormStep2";
				default:
					return "ListFormStep1";
			}
		});

		let date = new Date();
		date.setDate(date.getDate() + 1);
		const offset = date.getTimezoneOffset();
		date = new Date(date.getTime() - offset * 60 * 1000);

		const listInformation = ref({
			step1: {
				title: {
					label: labels.newList.step1.inputs.title.label,
					value: "",
					errorMessage: "",
					helperText: labels.newList.step1.inputs.title.helperText,
					placeholder: labels.newList.step1.inputs.title.placeholder,
					required: true,
				},
				description: {
					label: labels.newList.step1.inputs.description.label,
					value: "",
					placeholder: labels.newList.step1.inputs.description.placeholder,
					helperText: labels.newList.step1.inputs.description.helperText,
					errorMessage: "",
					required: false,
				},
				activateTermDate: {
					value: true,
					label: labels.newList.step1.inputs.activateTermDate.label,
					helperText: labels.newList.step1.inputs.activateTermDate.helperText,
				},
				termDate: {
					label: labels.newList.step1.inputs.termDate.label,
					value: date.toISOString().split("T")[0],
					helperText: labels.newList.step1.inputs.termDate.label,
					errorMessage: "",
				},
			},
			step2: {
				shared: {
					value: false,
					label: labels.newList.step2.inputs.shared.label,
					helperText: labels.newList.step2.inputs.shared.helperText,
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
					label: labels.newList.step2.inputs.owners.label,
					helperText: labels.newList.step2.inputs.owners.helperText,
					value: [],
				},
				authorizedUsers: {
					label: labels.newList.step2.inputs.authorizedUsers.label,
					helperText: labels.newList.step2.inputs.authorizedUsers.helperText,
					value: [],
				},
			},
		});

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

		const cancel = () => {
			router.push("/app/lists");
		};

		const handleChangeStepFromStepper = (newStep: number) => {
			if (checkStep(newStep - 1)) {
				step.value = newStep;
			}
		};

		const nextAction = () => {
			if (step.value !== maxStep) {
				if (checkStep(step.value)) {
					step.value++;
				}
				return;
			} else {
				// Call Store action
				// Redirect to new list or new gift
				router.push("/app/lists");
			}
		};

		const nextButtonText = computed(() => {
			if (step.value === 1) {
				return labels.newList.buttons.next.step2;
			}
			switch (step.value) {
				case 1:
					return labels.newList.buttons.next.step2;
				default:
					return labels.newList.buttons.next.default;
			}
		});

		const stepTitle = computed(() => {
			switch (step.value) {
				case 1:
					return labels.newList.step1.title;
				case 2:
					return labels.newList.step2.title;
				default:
					return "";
			}
		});

		const skipToList = () => {
			// Make verifications

			// Call Store action
			dispatch("createList", listInformation.value);
			// Redirect to new list or new gift
			router.push("/app/lists");
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
					labels.newList.step1.inputs.title.errors.mandatory;
				validateStep1 = false;
			}

			// Check that date is not in the past
			const dateIsInPast = new Date(listInformation.value.step1.termDate.value) <= new Date();
			if (dateIsInPast) {
				listInformation.value.step1.termDate.errorMessage =
					labels.newList.step1.inputs.termDate.errors.pastDate;
				validateStep1 = false;
			}

			return validateStep1;
		};

		const checkStep2 = (): boolean => {
			let validateStep2 = true;
			return validateStep2;
		};

		return {
			labels,
			cancel,
			currentComponent,
			handleChangeStepFromStepper,
			step,
			stepTitle,
			nextAction,
			nextButtonText,
			maxStep,
			skipToList,
			listInformation,
			handleListInformationChange,
		};
	},
});
</script>
