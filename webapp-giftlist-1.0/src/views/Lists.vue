<template>
	<DefaultLayout title="Mes listes">
		<Table :headers="tableHeaders" @sort="handleSort">
			<tr
				v-for="list in lists"
				:key="list.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${list.id}`)"
			>
				<ListItem :list="list" @delete="openDeleteModal" />
			</tr>
		</Table>

		<Modal
			:show="deleteModalIsOpen"
			@confirm="deleteList"
			@close="closeDeleteModal"
			type="danger"
			:title="`Supprimer la liste ${listToDelete?.title} ?`"
			confirmText="Supprimer"
			cancelText="Annuler"
		>
			<p class="text-sm text-gray-500">Êtes-vous sûr de vouloir supprimer cette liste ?</p>
			<p class="text-sm text-gray-500">Cette action est irréversible.</p>
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { List } from "@/types/api/List";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Table from "@/components/Styled/Table.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import Modal from "@/components/Styled/Modal.vue";

import { TableHeader as TableHeaderType } from "@/types/TableHeader";

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

		const tableHeaders = ref([
			{ title: "", width: "w-8", sortable: false },
			{ title: "Nom", sortable: true, sorted: "none" },
			{ title: "Propriétaire", sortable: true, sorted: "none" },
			{ title: "Status", sortable: true, sorted: "none" },
			{ title: "Date d'échéance", sortable: true, sorted: "none" },
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

		// onMounted(() => {
		// 	dispatch("initializeLists");
		// });

		return {
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
</script>
