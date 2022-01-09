<template>
	<DefaultLayout title="Nouvelle liste">
		<div class="flex flex-col h-full">
			<Stepper
				:step="step"
				:maxSteps="maxStep"
				:title="stepTitle"
				@changeStep="handleChangeStepFromStepper"
			/>

			<component
				class="p-4 my-4 rounded-md"
				:is="currentComponent"
				:values="listInformation['step' + step]"
				@change="handleListInformationChange"
			>
			</component>

			<div class="flex justify-between">
				<div class="flex gap-4">
					<Button btnStyle="danger" hasIcon @click="cancel">
						<template v-slot:icon>
							<XIcon />
						</template>
						Annuler
					</Button>
					<Button btnStyle="secondary" hasIcon v-show="step > 1" @click="step--">
						<template v-slot:icon>
							<ArrowLeftIcon />
						</template>
						Précédent
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
						Créer ma liste
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

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import NewListStep1 from "@/components/NewList/NewListStep1.vue";
import NewListStep2 from "@/components/NewList/NewListStep2.vue";
import NewListStep3 from "@/components/NewList/NewListStep3.vue";
import Stepper from "@/components/Styled/Stepper.vue";
import { XIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "NewList",
	components: {
		Button,
		DefaultLayout,
		NewListStep1,
		NewListStep2,
		NewListStep3,
		Stepper,
		XIcon,
		CheckIcon,
		ArrowLeftIcon,
		ArrowRightIcon,
	},
	setup() {
		const router = useRouter();

		const step = ref(2);
		const maxStep = 3;
		const currentComponent = computed(() => {
			switch (step.value) {
				case 1:
					return "NewListStep1";
				case 2:
					return "NewListStep2";
				case 3:
					return "NewListStep3";
				default:
					return "NewListStep1";
			}
		});

		let date = new Date();
		const offset = date.getTimezoneOffset();
		date = new Date(date.getTime() - offset * 60 * 1000);

		const listInformation = ref({
			step1: {
				title: "",
				description: "",
				activateTermDate: false,
				termDate: date.toISOString().split("T")[0],
			},
			step2: {
				shared: false,
				friends: [
					{ id: 1, name: "Marion L." },
					{ id: 12, name: "Nicolas D." },
					{ id: 13, name: "Marion L." },
				],
				owners: [],
				authorizedUsers: [],
			},
			step3: {},
		});

		const handleListInformationChange = (values: any) => {
			switch (step.value) {
				case 1:
					listInformation.value.step1 = values;
					return;
				case 2:
					listInformation.value.step2 = values;
					return;
				case 3:
					listInformation.value.step3 = values;
					return;
				default:
					return;
			}
		};

		const cancel = () => {
			router.push("/app/lists");
		};

		const handleChangeStepFromStepper = (newStep: number) => {
			// Check if we can go forward in steps
			step.value = newStep;
		};

		const nextAction = () => {
			if (step.value !== maxStep) {
				step.value++;
				return;
			} else {
				// Call Store action
				// Redirect to new list or new gift
				router.push("/app/lists");
			}
		};

		const nextButtonText = computed(() => {
			switch (step.value) {
				case 1:
					return "Etape 2 : Options de partage";
				case 2:
					return "Etape 3 : Ajouter des cadeaux";
				default:
					return "Suivant";
			}
		});

		const stepTitle = computed(() => {
			switch (step.value) {
				case 1:
					return "Informations générales";
				case 2:
					return "Options de partage";
				case 3:
					return "Ajouter des cadeaux";
				default:
					return "";
			}
		});

		const skipToList = () => {
			// Make verifications
			// Call Store action
			// Redirect to new list or new gift
			router.push("/app/lists");
		};

		return {
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
