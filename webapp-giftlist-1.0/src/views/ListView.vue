<template>
	<DefaultLayout :title="list.title" back :back-button-title="labels.titles.lists" back-button-link="/app/lists">
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>

		<div v-else>
			<div v-if="gifts.length === 0"
				class="absolute w-full h-full flex flex-col justify-center items-center text-gray-400 gap-8">
				<div class="text-lg">{{ labels.list.empty.description }}</div>
				<GiftIcon class="w-1/6" />
				<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft"
					@click="router.push(`/app/lists/${list.id}/new-gift`)">
					{{ labels.list.empty.button }}
				</GiftlistButton>
			</div>
			<div v-else>
				<div v-if="!isListView"
					class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-4 gap-y-8">
					<div class="border border-secondary-hover shadow-sm rounded-md p-4 flex flex-col gap-2 items-center justify-center cursor-pointer"
						@click="router.push(`/app/lists/${list.id}/new-gift`)">
						<PlusIcon class="w-8 text-gray-400" />
						<span class="">{{ labels.list.empty.button }}</span>
					</div>
					<GiftGridView v-for="gift in gifts" :key="gift.id" :gift="gift"
						@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)" @delete="handleDeleteModal" />
				</div>
				<GiftlistTable v-else :headers="tableHeaders" @sort="handleSort">
					<tr v-for="gift in gifts" :key="gift.id" class="cursor-pointer hover:bg-gray-50"
						@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)">
						<GiftListView :gift="gift" @delete="handleDeleteModal" />
					</tr>
				</GiftlistTable>
			</div>
			<GiftlistModal :show="sharingOptionsModal.showModal" :title="sharingOptionsModal.title"
				:cancel-text="sharingOptionsModal.cancelText" @close="sharingOptionsModal.showModal = false">
				<p class="mb-2">
					{{ labels.modals.sharingOptions.statusText }}
					<span class="font-semibold" :class="list.isShared ? 'text-success-default' : 'text-danger-default'">
						{{
								list.isShared
									? labels.lists.status.public.toLowerCase()
									: labels.lists.status.private.toLowerCase()
						}}.
					</span>
				</p>
				<div class="py-2">
					<InputLink :label="labels.modals.sharingOptions.link.label" :value="listSharingLink"
						:helper-text="labels.modals.sharingOptions.link.helperText" copy :disabled="!list.isShared" />
				</div>
				<div class="py-2">
					<InputText :label="labels.modals.sharingOptions.code.label" :value="list.sharingCode"
						:helper-text="labels.modals.sharingOptions.code.helperText" copy :disabled="!list.isShared" />
				</div>
				<GiftlistButton class="mb-4 w-full"
					:btn-style="list.isShared ? ButtonStyleEnum.dangerSoft : ButtonStyleEnum.successSoft"
					:loading="shareButtonIsLoading" @click="handleSharingOptionsConfirm()">{{
							sharingOptionsModal.confirmText
					}}</GiftlistButton>
			</GiftlistModal>

			<GiftlistModal :show="deleteModal.showModal" :title="deleteModal.title"
				:confirm-text="deleteModal.confirmText" :btn-loading="deleteButtonIsLoading" type="danger"
				@close="deleteModal.showModal = false" @confirm="handleDeleteConfirm()">
			</GiftlistModal>
		</div>
		<template #commands>
			<GiftlistButton v-if="list.isShared" :btn-style="ButtonStyleEnum.successSoft" has-icon
				@click="showSharingOptionsModal">
				<template #icon>
					<LockOpenIcon />
				</template>
				{{ labels.lists.status.public }}
			</GiftlistButton>
			<GiftlistButton v-else :btn-style="ButtonStyleEnum.dangerSoft" has-icon @click="showSharingOptionsModal">
				<template #icon>
					<LockClosedIcon />
				</template>
				{{ labels.lists.status.private }}
			</GiftlistButton>
			<span class="flex items-center mr-4 text-primary-default font-medium hover:text-primary-text cursor-pointer"
				@click="router.push(`/app/lists/${list.id}/settings`)">
				<CogIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.settings }}
			</span>
			<ToggleViewMode :is-grid-view="!isListView" class="ml-4 w-28" @change="toggleDisplayMode" />
		</template>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ComputedRef, Ref, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { TableHeader } from "@/types/front/TableHeader.ts";
import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftGridView from "@/components/GiftGridView.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistLoader from "@/components/GiftlistLoader.vue";
import GiftlistModal from "@/components/GiftlistModal.vue";
import GiftlistTable from "@/components/GiftlistTable.vue";
import GiftListView from "@/components/GiftListView.vue";
import InputLink from "@/components/InputLink.vue";
import InputText from "@/components/InputText.vue";
import ToggleViewMode from "@/components/ToggleViewMode.vue";

import { CogIcon, GiftIcon, LockClosedIcon, LockOpenIcon, PlusIcon } from "@heroicons/vue/outline";

/******** Basic imports ********/
const { dispatch, state, commit } = useStore();
const router = useRouter();
const auth = inject("Auth") as Auth0Client;

/******** Static data ********/
const listId = router.currentRoute.value.params.id as string;
const listPayload: ListIdPayload = {
	auth,
	listId,
};

/******** Reactive data ********/
const loading = ref(true);
const deleteButtonIsLoading = ref(false);
const shareButtonIsLoading = ref(false);
const tableHeaders: Ref<TableHeader[]> = ref([
	{
		title: labels.tables.gift.favorite,
		width: "w-10 text-center",
		sortable: true,
		sorted: "none",
	},
	{ title: labels.tables.gift.title, sortable: true, sorted: "none" },
	{ title: labels.tables.gift.type, sortable: true, sorted: "none" },
	{ title: labels.tables.gift.creationDate, sortable: true, sorted: "none" },
	{ title: labels.tables.gift.price, sortable: true, sorted: "none" },
]);

const deleteModal = ref({
	showModal: false,
	title: labels.modals.deleteGift.title,
	confirmText: labels.modals.deleteGift.confirm,
	gift: {} as GiftDTO,
});

/******** Computed data ********/
const list: ComputedRef<ListDTO> = computed(() => state.lists.selected);
const gifts: ComputedRef<GiftDTO[]> = computed(() => state.gifts.all);
const isListView = computed(() => {
	if (state.preferences.listView === undefined) {
		return true;
	} else {
		return state.preferences.listView;
	}
});

const listSharingLink = computed(() => {
	return list.value.sharingCode
		? process.env.VUE_APP_FRONT_URL + "/app/shared/" + list.value.sharingCode
		: "";
});

/******** Fetch page data ********/
onMounted(async () => {
	const successList = await dispatch("getList", listPayload);
	const successGifts = await dispatch("getGifts", listPayload);
	loading.value = !(successList && successGifts);
});

onUnmounted(() => {
	commit("EMPTY_LIST");
});

/******** Methods ********/
const handleSort = (headers: TableHeader[]) => {
	tableHeaders.value = headers;

	// TODO : Sort displayed data depending on tableHeaders sorted properties
};

const toggleDisplayMode = () => {
	dispatch("toggleListView", !isListView.value);
};

const shareList = async () => {
	if (!list.value.isShared) {
		await dispatch("shareList", listPayload);
	}
};
const unshareList = async () => {
	if (list.value.isShared) {
		await dispatch("unshareList", listPayload);
	}
};

const sharingOptionsModal = ref({
	showModal: false,
	title: labels.modals.sharingOptions.title,
	confirmText: computed(() => {
		return list.value.isShared
			? labels.modals.sharingOptions.confirmText.public
			: labels.modals.sharingOptions.confirmText.private;
	}),
	cancelText: labels.modals.sharingOptions.cancelText,
});

const showSharingOptionsModal = () => {
	sharingOptionsModal.value.showModal = true;
};

const handleSharingOptionsConfirm = async () => {
	shareButtonIsLoading.value = true;
	if (list.value.isShared) {
		await unshareList();
		shareButtonIsLoading.value = false;
	} else {
		await shareList();
		shareButtonIsLoading.value = false;
		await dispatch("getList", listPayload);
	}
};

const handleDeleteConfirm = async () => {
	deleteButtonIsLoading.value = true;
	const giftIdPayload: GiftIdPayload = {
		auth,
		listId,
		giftId: deleteModal.value.gift.id,
	};
	const success = await dispatch("deleteGift", giftIdPayload);
	if (success) {
		deleteModal.value.showModal = false;
		setTimeout(() => {
			deleteButtonIsLoading.value = false;
		}, 300);
	}
};

const handleDeleteModal = (gift: GiftDTO) => {
	deleteModal.value.title = labels.modals.deleteGift.title + gift.title;
	deleteModal.value.showModal = true;
	deleteModal.value.confirm = handleDeleteConfirm;
	deleteModal.value.gift = gift;
};
</script>
