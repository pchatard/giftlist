<template>
	<DefaultLayout
		:title="list.title"
		back
		:back-button-title="backButtonTitle"
		:back-button-link="router.options.history.state.back"
	>
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<Loader class="w-16 h-16" />
		</div>
		<div v-else>
			<div
				v-if="gifts.length === 0"
				class="absolute w-full h-full flex flex-col justify-center items-center text-gray-400 gap-8"
			>
				<div class="text-lg">{{ labels.sharedList.empty.description }}</div>
				<GiftIcon class="w-1/6" />
			</div>
			<div v-else>
				<div
					v-if="!isListView"
					class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-4 gap-y-8"
				>
					<GiftGridView
						v-for="gift in gifts"
						:key="gift.id"
						:gift="gift"
						:shared="true"
						@click="handleDetailsModal(gift)"
						@book="handleBookModal(gift)"
					/>
				</div>
				<Table v-else :headers="tableHeaders" @sort="handleSort">
					<tr
						v-for="gift in gifts"
						:key="gift.id"
						class="cursor-pointer hover:bg-gray-50"
						@click="handleDetailsModal(gift)"
					>
						<GiftListView :gift="gift" :shared="true" @book="handleBookModal(gift)" />
					</tr>
				</Table>
			</div>

			<Modal
				:show="modal.showModal"
				:title="modal.title"
				:confirm-text="modal.confirmText"
				:cancel-text="modal.cancelText"
				@close="modal.showModal = false"
				@confirm="modal.confirm"
			>
				<GiftDetails v-if="selectedGift" :gift="selectedGift" />
			</Modal>
		</div>
		<template #commands>
			<GridListToggle :is-grid-view="!isListView" class="w-28" @change="toggleDisplayMode" />
		</template>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftDetails from "@/components/GiftDetails.vue";
import GiftGridView from "@/components/GiftGridView.vue";
import GiftListView from "@/components/GiftListView.vue";
import GridListToggle from "@/components/GridListToggle/ToggleListView.vue";
import Loader from "@/components/Loader/Loader.vue";
import Modal from "@/components/Modal/GiftlistModal.vue";
import Table from "@/components/GiftlistTable.vue";
import labels from "@/labels/fr/labels.json";
import { Gift } from "@/types/api/Gift";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { ListSharingCodePayload } from "@/types/payload/ListSharingCodePayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { GiftIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "SharedListView",
	components: {
		DefaultLayout,
		GiftDetails,
		GiftGridView,
		GiftListView,
		GridListToggle,
		GiftIcon,
		Modal,
		Table,
		Loader,
	},
	setup() {
		/******** Basic imports ********/
		const { dispatch, state, commit } = useStore();
		const router = useRouter();
		const auth = inject("Auth") as Auth0Client;

		/******** Static data ********/
		const listCode = router.currentRoute.value.params.code as string;

		/******** Reactive data ********/
		const loading = ref(true);
		const selectedGift = ref();
		const bookingGift = ref();
		const tableHeaders = ref([
			{
				title: labels.tables.gift.favorite,
				width: "w-10 text-center",
				sortable: true,
				sorted: "none",
			},
			{ title: labels.tables.gift.title, sortable: true, sorted: "none" },
			{ title: labels.tables.gift.type, sortable: true, sorted: "none" },
			{ title: labels.tables.gift.status, sortable: true, sorted: "none" },
			{ title: labels.tables.gift.creationDate, sortable: true, sorted: "none" },
			{ title: labels.tables.gift.price, sortable: true, sorted: "none" },
		]);
		const modal = ref({
			showModal: false,
			title: "",
			confirmText: "",
			cancelText: "",
			confirm: () => handleDetailsConfirm(),
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

		const backButtonTitle = computed(() => {
			const previous = router.options.history.state.back;
			if (previous?.toString().includes("/app/booked")) {
				return labels.titles.booked;
			} else {
				return labels.titles.shared;
			}
		});

		/******** Fetch page data ********/
		onMounted(async () => {
			const sharingCodePayload: ListSharingCodePayload = {
				auth,
				sharingCode: listCode,
			};
			const successList = await dispatch("accessList", sharingCodePayload);
			const listIdPayload: ListIdPayload = {
				auth,
				listId: list.value.id,
			};
			const successGifts = await dispatch("getGifts", listIdPayload);
			loading.value = !(successGifts && successList);
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

		const openLinkInNewTab = () => {
			const link = "https://www.google.com";
			window.open(link, "_blank");
			self.focus();
		};

		const handleBookModal = (gift: Gift) => {
			modal.value.title = labels.modals.bookGift.title + gift.title;
			modal.value.confirmText = labels.modals.bookGift.confirm;
			modal.value.cancelText = labels.modals.bookGift.cancel;
			modal.value.showModal = true;
			modal.value.confirm = handleBookConfirm;
			selectedGift.value = null;
			bookingGift.value = gift;
		};

		const handleBookConfirm = () => {
			const bookPayload: GiftIdPayload = {
				auth,
				listId: list.value.id,
				giftId: bookingGift.value.id,
			};
			dispatch("bookGift", bookPayload);
			modal.value.showModal = false;
		};

		const handleDetailsModal = (gift: Gift) => {
			modal.value.title = gift.title;
			modal.value.confirmText = labels.modals.giftDetails.confirm;
			modal.value.cancelText = labels.modals.giftDetails.cancel;
			modal.value.showModal = true;
			modal.value.confirm = handleDetailsConfirm;
			selectedGift.value = gift;
		};

		const handleDetailsConfirm = () => {
			handleBookModal(selectedGift.value);
		};

		return {
			labels,
			loading,
			list,
			isListView,
			gifts,
			handleBookModal,
			handleDetailsModal,
			modal,
			openLinkInNewTab,
			router,
			tableHeaders,
			toggleDisplayMode,
			selectedGift,
			bookingGift,
			handleSort,
			backButtonTitle,
		};
	},
});
</script>
