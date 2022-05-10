<template>
	<div class="flex justify-between">
		<div class="flex gap-4">
			<GiftlistButton :btn-style="ButtonStyleEnum.danger" has-icon @click="handleCancelButton">
				<template #icon>
					<XIcon />
				</template>
				{{ labels.newList.buttons.cancel }}
			</GiftlistButton>
			<GiftlistButton
				v-show="currentStep > 1"
				:btn-style="ButtonStyleEnum.secondary"
				has-icon
				@click="handlePreviousButton"
			>
				<template #icon>
					<ArrowLeftIcon />
				</template>
				{{ labels.newList.buttons.previous }}
			</GiftlistButton>
		</div>
		<div class="w-1/2 flex gap-4">
			<GiftlistButton
				:btn-style="
					currentStep === maxStep ? ButtonStyleEnum.primary : ButtonStyleEnum.secondary
				"
				class="flex-1"
				has-icon
				:loading="submitButtonIsLoading"
				@click="handleSubmitButton"
			>
				<template #icon>
					<CheckIcon />
				</template>
				{{ submitButtonText }}
			</GiftlistButton>
			<GiftlistButton
				v-show="currentStep != maxStep"
				:btn-style="ButtonStyleEnum.primary"
				has-icon
				class="flex-1"
				@click="handleNextButton"
			>
				<template #icon>
					<ArrowRightIcon />
				</template>
				{{ nextButtonText }}
			</GiftlistButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";

import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";

import GiftlistButton from "@/components/GiftlistButton.vue";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from "@heroicons/vue/outline";

interface Props {
	currentStep: number;
	maxStep: number;
	submitButtonText: string;
	submitButtonIsLoading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "submit"): void;
}>();

const router = useRouter();
const { dispatch } = useStore();

const nextButtonText = computed(() => {
	return props.currentStep === 1
		? labels.newList.buttons.next.step2
		: labels.newList.buttons.next.default;
});

const goToLists = () => {
	router.push("/app/lists");
};

const handleCancelButton = () => {
	goToLists();
};

const handlePreviousButton = () => {
	dispatch("changeListCurrentStep", props.currentStep - 1);
};

const checkStep = async (step: number): Promise<boolean> => {
	if (step === 1) {
		return await dispatch("checkListStepOneData");
	}

	if (step === 2) {
		return await dispatch("checkListStepTwoData");
	}

	return false;
};

const handleNextButton = async () => {
	if (props.currentStep < props.maxStep) {
		if (await checkStep(props.currentStep)) {
			dispatch("changeListCurrentStep", props.currentStep + 1);
		}
		return;
	} else {
		goToLists();
	}
};

const handleSubmitButton = () => {
	emit("submit");
};
</script>
