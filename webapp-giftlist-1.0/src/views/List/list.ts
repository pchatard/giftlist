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
		const actionPayload: ListIdPayload = {
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
			gift: {} as Gift,
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
		})

		/******** Fetch page data ********/
		onMounted(async () => {
			const success = await dispatch("getList", actionPayload);
			loading.value = !success;
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

		const handleDeleteModal = (gift: Gift) => {
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
				await dispatch("shareList", actionPayload);
			}
		}
		const unshareList = async () => {
			if (list.value.isShared) {
				await dispatch("unshareList", actionPayload);
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
