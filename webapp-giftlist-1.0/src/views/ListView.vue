<template>
	<DefaultLayout
		:title="list.title"
		back
		:back-button-title="labels.titles.lists"
		back-button-link="/app/lists"
	>
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>

		<div v-else>
			<div
				v-if="gifts.length === 0"
				class="absolute w-full h-full flex flex-col justify-center items-center text-gray-400 gap-8"
			>
				<div class="text-lg">{{ labels.list.empty.description }}</div>
				<GiftIcon class="w-1/6" />
				<GiftlistButton
					btn-style="primary-soft"
					@click="router.push(`/app/lists/${list.id}/new-gift`)"
				>
					{{ labels.list.empty.button }}
				</GiftlistButton>
			</div>
			<div v-else>
				<div
					v-if="!isListView"
					class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-4 gap-y-8"
				>
					<div
						@click="router.push(`/app/lists/${list.id}/new-gift`)"
						class="border border-gray-200 shadow-sm rounded-md p-4 flex flex-col gap-2 items-center justify-center cursor-pointer"
					>
						<PlusIcon class="w-8 text-gray-400" />
						<span class="">{{ labels.list.empty.button }}</span>
					</div>
					<GiftGridView
						@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)"
						v-for="gift in gifts"
						:key="gift.id"
						:gift="gift"
						@delete="handleDeleteModal"
					/>
				</div>
				<GiftlistTable v-else :headers="tableHeaders" @sort="handleSort">
					<tr
						v-for="gift in gifts"
						:key="gift.id"
						class="cursor-pointer hover:bg-gray-50"
						@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)"
					>
						<GiftListView :gift="gift" @delete="handleDeleteModal" />
					</tr>
				</GiftlistTable>
			</div>
			<GiftlistModal
				:show="sharingOptionsModal.showModal"
				:title="sharingOptionsModal.title"
				:cancel-text="sharingOptionsModal.cancelText"
				@close="sharingOptionsModal.showModal = false"
			>
				<p class="mb-2">
					{{ labels.modals.sharingOptions.statusText }}
					<span
						class="font-semibold"
						:class="list.isShared ? 'text-green-600' : 'text-red-600'"
					>
						{{
							list.isShared
								? labels.lists.status.public.toLowerCase()
								: labels.lists.status.private.toLowerCase()
						}}.
					</span>
				</p>
				<div class="py-2">
					<InputLink
						:label="labels.modals.sharingOptions.link.label"
						:value="listSharingLink"
						:helper-text="labels.modals.sharingOptions.link.helperText"
						copy
						:disabled="!list.isShared"
					/>
				</div>
				<div class="py-2">
					<InputText
						:label="labels.modals.sharingOptions.code.label"
						:value="list.sharingCode"
						:helper-text="labels.modals.sharingOptions.code.helperText"
						copy
						:disabled="!list.isShared"
					/>
				</div>
				<GiftlistButton
					class="mb-4 w-full"
					:btn-style="list.isShared ? 'danger-soft' : 'green-soft'"
					:loading="shareButtonIsLoading"
					@click="sharingOptionsModal.confirm"
					>{{ sharingOptionsModal.confirmText }}</GiftlistButton
				>
			</GiftlistModal>

			<GiftlistModal
				:show="deleteModal.showModal"
				:title="deleteModal.title"
				:confirm-text="deleteModal.confirmText"
				@close="deleteModal.showModal = false"
				@confirm="deleteModal.confirm"
				:btn-loading="deleteButtonIsLoading"
				type="danger"
			>
			</GiftlistModal>
		</div>
		<template #commands>
			<span
				v-if="list.isShared"
				class="flex items-center mr-4 text-green-600 font-medium hover:text-green-900 hover:bg-green-100 px-2 py-1 rounded-md cursor-pointer"
				@click="showSharingOptionsModal"
			>
				<LockOpenIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.status.public }}
			</span>
			<span
				v-else
				class="flex items-center mr-4 text-red-600 font-medium hover:text-red-900 hover:bg-red-100 px-2 py-1 rounded-md cursor-pointer"
				@click="showSharingOptionsModal"
			>
				<LockClosedIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.status.private }}
			</span>
			<span
				class="flex items-center mr-4 text-indigo-600 font-medium hover:text-indigo-900 cursor-pointer"
				@click="router.push(`/app/lists/${list.id}/settings`)"
			>
				<CogIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.settings }}
			</span>
			<ToggleViewMode
				:is-grid-view="!isListView"
				class="ml-4 w-28"
				@change="toggleDisplayMode"
			/>
		</template>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";

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

import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";

export default defineComponent({
	name: "ListView",
	components: {
		GiftlistButton,
		CogIcon,
		LockClosedIcon,
		LockOpenIcon,
		DefaultLayout,
		GiftIcon,
		GiftGridView,
		GiftListView,
		ToggleViewMode,
		InputText,
		InputLink,
		GiftlistModal,
		GiftlistTable,
		GiftlistLoader,
		PlusIcon,
	},
	setup() {
		/******** Basic imports ********/
		const { dispatch, state, commit } = useStore();
		const router = useRouter();
		const auth = inject("Auth") as any;

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
		const tableHeaders = ref([
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

		const sharingOptionsModal = ref({
			showModal: false,
			title: labels.modals.sharingOptions.title,
			confirmText: computed(() => {
				return list.value.isShared
					? labels.modals.sharingOptions.confirmText.public
					: labels.modals.sharingOptions.confirmText.private;
			}),
			cancelText: labels.modals.sharingOptions.cancelText,
			confirm: () => handleSharingOptionsConfirm(),
		});

		const deleteModal = ref({
			showModal: false,
			title: labels.modals.deleteGift.title,
			confirmText: labels.modals.deleteGift.confirm,
			confirm: () => handleDeleteConfirm(),
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
		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const toggleDisplayMode = () => {
			dispatch("toggleListView", !isListView.value);
		};

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

		const handleDeleteModal = (gift: GiftDTO) => {
			deleteModal.value.title = labels.modals.deleteGift.title + gift.title;
			deleteModal.value.showModal = true;
			deleteModal.value.confirm = handleDeleteConfirm;
			deleteModal.value.gift = gift;
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

		return {
			loading,
			isListView,
			labels,
			gifts,
			handleDeleteModal,
			list,
			deleteModal,
			sharingOptionsModal,
			showSharingOptionsModal,
			listSharingLink,
			router,
			tableHeaders,
			toggleDisplayMode,
			handleSort,
			shareList,
			unshareList,
			deleteButtonIsLoading,
			shareButtonIsLoading,
		};
	},
});
</script>
