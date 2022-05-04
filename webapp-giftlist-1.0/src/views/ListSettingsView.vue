<template>
	<DefaultLayout :title="labels.titles.listSettings" back>
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>
		<div v-else class="flex flex-col">
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
				:submit-button-text="labels.listOptions.button.submit"
				:submit-button-is-loading="submitButtonIsLoading"
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
import GiftlistLoader from "@/components/GiftlistLoader.vue";
import GiftlistSubtitle from "@/components/GiftlistSubtitle.vue";
import ListFormOne from "@/components/ListFormOne.vue";
import ListFormTwo from "@/components/ListFormTwo.vue";
import ListFormControls from "@/components/ListFormControls.vue";
import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { EditListPayload } from "@/types/payload/EditListPayload";
import { PartialListDTO } from "@/types/dto/PartialListDTO";

/******** Basic imports ********/
const { state, getters, dispatch, commit } = useStore();

/******** Static data ********/
const maxStep = 2;
const auth = inject("Auth") as Auth0Client;
const router = useRouter();

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

/******** Reactive data ********/
const loading = ref(true);
const submitButtonIsLoading = ref(false);

/******** Computed data ********/
const currentStep: ComputedRef<number> = computed(() => getters.getCurrentStep);
const initialList: ComputedRef<ListDTO> = computed(() => state.lists.selected);
const partialListData: ComputedRef<PartialListDTO> = computed(() =>
	getters.getPartialListData(initialList.value)
);

const stepTitle = computed(() => {
	if (currentStep.value === 1) {
		return labels.newList.step1.title;
	}
	if (currentStep.value === 2) {
		return labels.newList.step2.title;
	}
	return "";
});

onMounted(async () => {
	const actionPayload: ListIdPayload = {
		auth,
		listId: router.currentRoute.value.params.id as string,
	};
	const success = await dispatch("getList", actionPayload);
	if (success) {
		dispatch("initListData", initialList.value);
		loading.value = false;
	}
});

onUnmounted(() => {
	commit("EMPTY_LIST");
	dispatch("initListFormState");
});

const handleSubmit = async () => {
	submitButtonIsLoading.value = true;

	const check1 = await dispatch("checkListStepOneData");
	const check2 = await dispatch("checkListStepTwoData");

	if (check1 && check2) {
		const editPayload: EditListPayload = {
			auth,
			listId: initialList.value.id || (router.currentRoute.value.params.id as string),
			partialList: partialListData.value,
		};

		const success = await dispatch("editList", editPayload);
		if (success) {
			router.go(-1);
		} else if (!check1) {
			dispatch("changeListCurrentStep", 1);
		} else {
			dispatch("changeListCurrentStep", 2);
		}
	}

	submitButtonIsLoading.value = false;
};
</script>
