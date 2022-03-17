import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import GiftGridView from "@/components/GiftGridView/GiftGridView.vue";
import GiftListView from "@/components/GiftListView/GiftListView.vue";
import GridListToggle from "@/components/GridListToggle/GridListToggle.vue";
import Modal from "@/components/Modal/Modal.vue";
import Table from "@/components/Table/Table.vue";
import labels from "@/labels/fr/labels.json";
import { Gift } from "@/types/api/Gift";
import { CogIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/vue/outline";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { ListDTO } from "@/types/dto/ListDTO";
import { GiftDTO } from "@/types/dto/GiftDTO";

export default defineComponent({
	name: "List",
	components: {
		CogIcon,
		LockClosedIcon,
		LockOpenIcon,
		DefaultLayout,
		GiftGridView,
		GiftListView,
		GridListToggle,
		Modal,
		Table,
	},
	setup() {
		/******** Basic imports ********/
		const { dispatch, state, getters, commit } = useStore();
		const router = useRouter();
		const auth = inject("Auth") as any;

		/******** Static data ********/
		const listId = router.currentRoute.value.params.id as string;
		const listPayload: ListIdPayload = {
			auth,
			listId
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

		const modal = ref({
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
		})

		/******** Fetch page data ********/
		onMounted(async () => {
			const successList = await dispatch("getList", listPayload);
			const successGifts = await dispatch("getGifts", listPayload)
			loading.value = !(successList && successGifts);
		});

		onUnmounted(() => {
			commit("EMPTY_LIST");
		})

		/******** Methods ********/
		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const toggleDisplayMode = () => {
			console.log("Grid mode is disabled for now");
			// dispatch("toggleListDisplayMode");
		};

		const handleDeleteModal = (gift: GiftDTO) => {
			modal.value.title = labels.modals.deleteGift.title + gift.title;
			modal.value.showModal = true;
			modal.value.confirm = handleDeleteConfirm;
			modal.value.gift = gift;
		};

		const handleDeleteConfirm = () => {
			dispatch("deleteGift");
			modal.value.showModal = false;
		};

		const shareList = async () => {
			if (!list.value.isShared) {
				await dispatch("shareList", listPayload);
			}
		}
		const unshareList = async () => {
			if (list.value.isShared) {
				await dispatch("unshareList", listPayload);
			}
		}

		return {
			loading,
			isListView,
			labels,
			gifts,
			handleDeleteModal,
			list,
			modal,
			router,
			tableHeaders,
			toggleDisplayMode,
			handleSort,
			shareList,
			unshareList,
		};
	},
});
