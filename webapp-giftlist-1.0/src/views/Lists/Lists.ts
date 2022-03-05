import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import Modal from "@/components/Styled/Modal.vue";
import Table from "@/components/Styled/Table.vue";
import labels from "@/labels/fr/labels.json";
import { List } from "@/types/api/List";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
		ListItem,
		Table,
		Modal,
	},
	setup() {
		const { dispatch, state } = useStore();
		const router = useRouter();
		const listTableHeaderLabels = (labels as any).tables.list;

		const tableHeaders = ref([
			{ title: "", width: "w-8", sortable: false },
			{ title: listTableHeaderLabels.title, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.owners, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.status, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.termDate, sortable: true, sorted: "none" },
		]);

		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const lists: ComputedRef<List[]> = computed(() => state.list.mine);

		const deleteModalIsOpen = ref(false);
		const listToDelete: Ref<List | undefined> = ref();

		const openDeleteModal = (list: List) => {
			listToDelete.value = list;
			deleteModalIsOpen.value = true;
		};
		const closeDeleteModal = () => {
			deleteModalIsOpen.value = false;
		};

		const deleteList = async () => {
			dispatch("deleteList", listToDelete.value?.id)
				.then(() => {
					closeDeleteModal();
				})
				.catch((error) => {
					console.error(error);
				});
		};

		return {
			labels,
			deleteModalIsOpen,
			listToDelete,
			openDeleteModal,
			closeDeleteModal,
			deleteList,
			lists,
			router,
			tableHeaders,
			handleSort,
		};
	},
});
