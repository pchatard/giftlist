import { computed, ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import GiftDetails from '@/components/Gift/GiftDetails.vue';
import DefaultLayout from '@/components/Styled/DefaultLayout.vue';
import GiftGrid from '@/components/Styled/GiftGrid.vue';
import GiftList from '@/components/Styled/GiftList.vue';
import ListGridToggleButton from '@/components/Styled/ListGridToggleButton.vue';
import Modal from '@/components/Styled/Modal.vue';
import Table from '@/components/Styled/Table.vue';
import labels from '@/labels/fr/labels.json';
import { Gift } from '@/types/api/Gift';

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
		GiftDetails,
		GiftGrid,
		GiftList,
		ListGridToggleButton,
		Modal,
		Table,
	},
	setup() {
		const { dispatch, state } = useStore();
		const router = useRouter();
		const listCode = router.currentRoute.value.params.code;
		const auth = ref(inject("Auth") as any);

		const listName = "La liste de mon copain";

		onMounted(() => {
			dispatch("initializeGifts", listCode);
			dispatch("initializePreferences", auth.value.user.sub);
		});

		const backButtonTitle = computed(() => {
			const previous = router.options.history.state.back;
			if (previous?.toString().includes("/app/booked")) {
				return labels.titles.booked;
			} else {
				return labels.titles.shared;
			}
		});

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

		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);

		const selectedGift = ref();

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

		const modal = ref({
			showModal: false,
			title: "",
			confirmText: "",
			cancelText: "",
			confirm: handleDetailsConfirm,
		});

		return {
			listName,
			isListView: computed(() => {
				if (state.preferences.displayList === undefined) {
					return true;
				} else {
					return state.preferences.displayList;
				}
			}),
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
