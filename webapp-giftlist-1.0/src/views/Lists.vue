<template>
	<DefaultLayout :title="labels.titles.lists">
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
			:title="labels.modals.deleteList.title + listToDelete?.title"
			:confirmText="labels.modals.deleteList.confirm"
			:cancelText="labels.modals.deleteList.cancel"
		>
			<p class="text-sm text-gray-500">{{ labels.modals.deleteList.text }}</p>
			<p class="text-sm text-gray-500">{{ labels.modals.deleteList.text2 }}</p>
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";

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
			{ title: labels.tables.list.title, sortable: true, sorted: "none" },
			{ title: labels.tables.list.owners, sortable: true, sorted: "none" },
			{ title: labels.tables.list.status, sortable: true, sorted: "none" },
			{ title: labels.tables.list.termDate, sortable: true, sorted: "none" },
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
</script>
