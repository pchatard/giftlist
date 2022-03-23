import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import GiftGridView from "@/components/GiftGridView/GiftGridView.vue";
import GiftListView from "@/components/GiftListView/GiftListView.vue";
import GridListToggle from "@/components/GridListToggle/GridListToggle.vue";
import InputLink from "@/components/InputLink/InputLink.vue";
import InputText from "@/components/InputText/InputText.vue";
import Modal from "@/components/Modal/Modal.vue";
import Table from "@/components/Table/Table.vue";
import labels from "@/labels/fr/labels.json";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { CogIcon, LockClosedIcon, LockOpenIcon, GiftIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "List",
	components: {
		Button,
		CogIcon,
		LockClosedIcon,
		LockOpenIcon,
		DefaultLayout,
		GiftIcon,
		GiftGridView,
		GiftListView,
		GridListToggle,
		InputText,
		InputLink,
		Modal,
		Table,
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
				return list.value.isShared ? labels.modals.sharingOptions.confirmText.public : labels.modals.sharingOptions.confirmText.private;
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
			if (state.preferences.displayList === undefined) {
				return true;
			} else {
				return state.preferences.displayList;
			}
		});

		const listSharingLink = computed(() => {
			return list.value.sharingCode ? process.env.VUE_APP_FRONT_URL + "/app/shared/" + list.value.sharingCode : "";
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
			console.log("Grid mode is disabled for now");
			// dispatch("toggleListDisplayMode");
		};

		const showSharingOptionsModal = () => {
			sharingOptionsModal.value.showModal = true;
		}

		const handleSharingOptionsConfirm = async () => {
			if (list.value.isShared) {
				await unshareList();
			} else {
				await shareList();
				await dispatch("getList", listPayload);
			}
		}

		const handleDeleteModal = (gift: GiftDTO) => {
			deleteModal.value.title = labels.modals.deleteGift.title + gift.title;
			deleteModal.value.showModal = true;
			deleteModal.value.confirm = handleDeleteConfirm;
			deleteModal.value.gift = gift;
		};

		const handleDeleteConfirm = async () => {
			const giftIdPayload: GiftIdPayload = {
				auth,
				listId,
				giftId: deleteModal.value.gift.id,
			};
			const success = await dispatch("deleteGift", giftIdPayload);
			if (success) {
				deleteModal.value.showModal = false;
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
		};
	},
});
