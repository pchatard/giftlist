<template>
	<DefaultLayout :title="labels.titles.newGift" back>
		<GiftForm
			action="create"
			:loading="buttonIsLoading"
			:categories="giftCategories"
			@cancel="cancel"
			@confirm="createGift"
		/>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ComputedRef, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftForm from "@/components/GiftForm.vue";
import labels from "@/labels/fr/labels.json";
import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { CreateGiftPayload } from "@/types/payload/CreateGiftPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";

/******** Basic imports ********/
const router = useRouter();
const { dispatch, getters } = useStore();
const auth = inject("Auth") as Auth0Client;

/******** Static imports ********/
const listId = router.currentRoute.value.params.id as string;
const giftCategories = [
	{ id: "x", name: "Général" },
	{ id: "0", name: "Vêtements" },
	{ id: "1", name: "Chaussures" },
	{ id: "2", name: "High-Tech" },
	{ id: "3", name: "Evènements" },
];

/******** Reactive data ********/
const buttonIsLoading = ref(false);

/******** Computed data ********/
const createGiftData: ComputedRef<CreateGiftDTO> = computed(() => getters.getCreateGiftData);

onMounted(() => {
	dispatch("initGiftFormState");
});
onUnmounted(() => {
	dispatch("initGiftFormState");
});

/******** Methods ********/
const cancel = () => {
	router.push("/app/lists/" + listId);
};

const createGift = async () => {
	buttonIsLoading.value = true;

	if (!(await dispatch("checkGiftData"))) {
		buttonIsLoading.value = false;
		return;
	}

	const giftPayload: CreateGiftPayload = {
		auth,
		listId,
		gift: createGiftData.value,
	};
	const success = await dispatch("createGift", giftPayload);
	if (success) {
		router.push("/app/lists/" + listId);
		return;
	} else {
		buttonIsLoading.value = false;
	}
};
</script>
