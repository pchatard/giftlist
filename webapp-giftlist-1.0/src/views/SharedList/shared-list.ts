import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import GiftDetails from "@/components/GiftDetails/GiftDetails.vue";
import GiftGridView from "@/components/GiftGridView/GiftGridView.vue";
import GiftListView from "@/components/GiftListView/GiftListView.vue";
import GridListToggle from "@/components/GridListToggle/GridListToggle.vue";
import Modal from "@/components/Modal/Modal.vue";
import Table from "@/components/Table/Table.vue";
import labels from "@/labels/fr/labels.json";
import { Gift } from "@/types/api/Gift";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { ListSharingCodePayload } from "@/types/payload/ListSharingCodePayload";
import { ListDTO } from "@/types/dto/ListDTO";

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
		GiftDetails,
		GiftGridView,
		GiftListView,
		GridListToggle,
		Modal,
		Table,
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
		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);
		const isListView = computed(() => {
			if (state.preferences.displayList === undefined) {
				return true;
			} else {
				return state.preferences.displayList;
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

		/******** Watch ********/

		/******** Fetch page data ********/
		onMounted(async () => {
			const actionPayload: ListSharingCodePayload = {
				auth,
				sharingCode: listCode
			};
			const success = await dispatch("accessList", actionPayload);
			loading.value = !success;
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
			console.log("Grid mode is disabled for now");
			// dispatch("toggleListDisplayMode");
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
		};

		const handleBookConfirm = () => {
			dispatch("bookGift");
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
			handleSort,
			backButtonTitle,
		};
	},
});
