<template>
	<DefaultLayout :title="labels.titles.newList" back>
		<div class="flex flex-col">
			<div class="relative my-4 flex flex-col border rounded-lg">
				<GiftlistSubtitle
					class="absolute top-0 left-4 transform -translate-y-1/2 bg-white px-4"
				>
					{{ stepTitle }}
				</GiftlistSubtitle>

				<ListFormOne v-if="currentStep === 1" class="p-4 my-4 rounded-md" />
				<ListFormTwo v-else class="p-4 my-4 rounded-md" :friends="friends" />
			</div>

			<ListFormControls
				:current-step="currentStep"
				:max-step="maxStep"
				:submit-button-text="labels.newList.buttons.confirm"
				:submit-button-is-loading="createButtonIsLoading"
				@submit="handleSubmit"
			/>
		</div>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ComputedRef, inject, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/DefaultLayout.vue";
import ListFormOne from "@/components/ListFormOne.vue";
import ListFormTwo from "@/components/ListFormTwo.vue";
import GiftlistSubtitle from "@/components/GiftlistSubtitle.vue";
import ListFormControls from "../components/ListFormControls.vue";

import { CreateListPayload } from "@/types/payload/CreateListPayload";
import { CreateListDTO } from "@/types/dto/CreateListDTO";

/******** Basic imports ********/
const { getters, dispatch } = useStore();
const router = useRouter();
const auth = inject("Auth") as Auth0Client;

/******** Static data ********/
const maxStep = 2;

const friends = [
	{ id: 1, name: "Arnold A." },
	{ id: 12, name: "Ben 10" },
	{ id: 13, name: "Carl Os" },
	{ id: 14, name: "Denis D." },
	{ id: 15, name: "Elliot E." },
	{ id: 25, name: "Fabrice L." },
	{ id: 54, name: "Guéric G." },
	{ id: 47, name: "Hans H." },
];

onMounted(() => {
	dispatch("initListFormState");
});
onUnmounted(() => {
	dispatch("initListFormState");
});

/******** Ref data ********/
const createButtonIsLoading = ref(false);

/******** Computed data ********/
const currentStep: ComputedRef<number> = computed(() => getters.getCurrentStep);
const createListData: ComputedRef<CreateListDTO> = computed(() => getters.getListData);

const stepTitle = computed(() => {
	if (currentStep.value === 1) {
		return labels.newList.step1.title;
	}
	if (currentStep.value === 2) {
		return labels.newList.step2.title;
	}
	return "";
});

const handleSubmit = async () => {
	createButtonIsLoading.value = true;

	const check1 = await dispatch("checkListStepOneData");
	const check2 = await dispatch("checkListStepTwoData");

	if (check1 && check2) {
		const payload: CreateListPayload = {
			auth,
			newList: createListData.value,
		};
		const success = await dispatch("createList", payload);
		if (success) {
			router.push("/app/lists");
			return;
		}
	} else if (!check1) {
		dispatch("changeListCurrentStep", 1);
	} else {
		dispatch("changeListCurrentStep", 2);
	}

	createButtonIsLoading.value = false;
};
</script>
