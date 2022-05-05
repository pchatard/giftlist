<template>
	<DefaultLayout
		:title="gift.title"
		back
		:back-button-title="list.title"
		:back-button-link="'/app/lists/' + list.id"
	>
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>
		<div v-else>
			<GiftForm
				action="update"
				:loading="confirmButtonIsLoading"
				:categories="giftCategories"
				@cancel="cancel"
				@confirm="saveGiftChanges"
			/>

			<GiftlistModal
				:show="modal.showModal"
				:title="modal.title"
				:confirm-text="modal.confirmText"
				:type="ModalTypeEnum.DANGER"
				:btn-loading="deleteButtonIsLoading"
				@close="modal.showModal = false"
				@confirm="handleDeleteConfirm()"
			>
			</GiftlistModal>
		</div>
		<template #commands>
			<GiftlistButton :btn-style="ButtonStyleEnum.danger" has-icon @click="handleDeleteModal">
				<template #icon>
					<TrashIcon />
				</template>
				{{ labels.gift.buttons.delete }}
			</GiftlistButton>
		</template>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ComputedRef, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftForm from "@/components/GiftForm.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistLoader from "@/components/GiftlistLoader.vue";
import GiftlistModal from "@/components/GiftlistModal.vue";

import { TrashIcon } from "@heroicons/vue/outline";

import { GiftCategory } from "@/types/api/GiftCategory";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { PartialGiftDTO } from "@/types/dto/PartialGiftDTO";
import { EditGiftPayload } from "@/types/payload/EditGiftPayload";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";
import { ModalTypeEnum } from "@/types/enums/ModalTypeEnum";

/******** Basic imports ********/
const router = useRouter();
const { dispatch, state, commit, getters } = useStore();
const auth = inject("Auth") as Auth0Client;

/******** Static imports ********/
const listId = router.currentRoute.value.params.id as string;
const giftId = router.currentRoute.value.params.giftId as string;

const giftCategories: GiftCategory[] = [
	{ id: "x", name: "Général" },
	{ id: "0", name: "Vêtements" },
	{ id: "1", name: "Chaussures" },
	{ id: "2", name: "High-Tech" },
	{ id: "3", name: "Evènements" },
];

/******** Reactive data ********/
const loading = ref(true);
const confirmButtonIsLoading = ref(false);
const deleteButtonIsLoading = ref(false);

const modal = ref({
	showModal: false,
	title: labels.modals.deleteGift.title,
	confirmText: labels.modals.deleteGift.confirm,
});

/******** Computed data ********/
const list: ComputedRef<ListDTO> = computed(() => state.lists.selected);
const gift: ComputedRef<GiftDTO> = computed(() => state.gifts.selected);
const partialGiftData: ComputedRef<PartialGiftDTO> = computed(() =>
	getters.getPartialGiftData(gift.value)
);

/******** Methods ********/
onMounted(async () => {
	const listIdPayload: ListIdPayload = {
		auth,
		listId,
	};
	const successList = await dispatch("getList", listIdPayload);
	const giftIdPayload: GiftIdPayload = {
		auth,
		listId,
		giftId,
	};
	const successGift = await dispatch("getGift", giftIdPayload);
	if (successList && successGift) {
		dispatch("initGiftData", gift.value);
		loading.value = false;
	}
});

onUnmounted(() => {
	commit("EMPTY_LIST");
	commit("EMPTY_GIFT");
	dispatch("initGiftFormState");
});

const cancel = () => {
	router.push("/app/lists/" + listId);
};

const saveGiftChanges = async () => {
	confirmButtonIsLoading.value = true;

	// Validate fields
	if (!(await dispatch("checkGiftData"))) {
		confirmButtonIsLoading.value = false;
		return;
	}

	const editGiftPayload: EditGiftPayload = {
		auth,
		listId,
		giftId,
		partialGift: partialGiftData.value,
	};

	// Call store action
	const success = await dispatch("editGift", editGiftPayload);
	if (success) {
		router.push("/app/lists/" + listId);
	}
	confirmButtonIsLoading.value = false;
};

const handleDeleteModal = () => {
	modal.value.title = labels.modals.deleteGift.title + gift.value.title;
	modal.value.showModal = true;
};

const handleDeleteConfirm = async () => {
	deleteButtonIsLoading.value = true;
	const giftIdPayload: GiftIdPayload = {
		auth,
		listId,
		giftId,
	};
	const success = await dispatch("deleteGift", giftIdPayload);
	if (success) {
		modal.value.showModal = false;
		router.go(-1);
	}
};
</script>
