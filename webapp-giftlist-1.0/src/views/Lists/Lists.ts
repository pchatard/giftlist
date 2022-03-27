import { computed, ComputedRef, defineComponent, inject, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import ListItem from "@/components/ListItem/ListItem.vue";
import Modal from "@/components/Modal/Modal.vue";
import Table from "@/components/Table/Table.vue";
import labels from "@/labels/fr/labels.json";
import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { CollectionIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Lists",
	components: {
		Button,
		DefaultLayout,
		ListItem,
		Table,
		Modal,
		CollectionIcon,
	},
	setup() {
		/******** Basic imports ********/
		const { dispatch, state } = useStore();
		const router = useRouter();
		const auth = inject("Auth") as Auth0Client;

		/******** Static imports ********/
		const listTableHeaderLabels = (labels as any).tables.list;

		/******** Reactive data ********/
		const loading = ref(true);
		const deleteModalIsOpen = ref(false);
		const lists: ComputedRef<ListDTO[]> = computed(() => state.lists.owned);
		const listToDelete: Ref<ListDTO | undefined> = ref();
		const tableHeaders = ref([
			{ title: "", width: "w-8", sortable: false },
			{ title: listTableHeaderLabels.title, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.owners, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.status, sortable: true, sorted: "none" },
			{ title: listTableHeaderLabels.termDate, sortable: true, sorted: "none" },
		]);

		/******** Fetch page data ********/
		onMounted(async () => {
			const success = await dispatch("getLists", { auth, select: "owned" });
			loading.value = !success;
		});

		/******** Methods ********/
		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const openDeleteModal = (list: ListDTO) => {
			listToDelete.value = list;
			deleteModalIsOpen.value = true;
		};

		const closeDeleteModal = () => {
			deleteModalIsOpen.value = false;
		};

		const deleteList = async () => {
			if (listToDelete.value) {
				const payload: ListIdPayload = {
					auth,
					listId: listToDelete.value.id,
				};
				const success = await dispatch("deleteList", payload);
				if (success) {
					closeDeleteModal();
				}
			}
		};

		return {
			loading,
			labels,
			router,
			deleteModalIsOpen,
			lists,
			listToDelete,
			tableHeaders,
			handleSort,
			openDeleteModal,
			closeDeleteModal,
			deleteList,
		};
	},
});
