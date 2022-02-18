<template>
	<DefaultLayout
		:title="listName"
		back
		:backButtonTitle="labels.titles.lists"
		backButtonLink="/app/lists"
	>
		<template v-slot:commands>
			<span
				class="
					flex
					items-center
					mr-4
					text-indigo-600
					font-medium
					hover:text-indigo-900
					cursor-pointer
				"
				@click="router.push(`/app/lists/${list.id}/settings`)"
			>
				<CogIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.settings }}
			</span>
			<ListGridToggleButton :isGridView="!isListView" class="w-28" @change="toggleDisplayMode" />
		</template>

		<div
			v-if="!isListView"
			class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-8"
		>
			<GiftGrid v-for="gift in gifts" :key="gift.id" :gift="gift" />
		</div>
		<Table v-else :headers="tableHeaders" @sort="handleSort">
			<tr
				v-for="gift in gifts"
				:key="gift.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)"
			>
				<GiftList :gift="gift" @delete="handleDeleteModal" />
			</tr>
		</Table>

		<Modal
			:show="modal.showModal"
			:title="modal.title"
			:confirmText="modal.confirmText"
			@close="modal.showModal = false"
			@confirm="modal.confirm"
			type="danger"
		>
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";

import { Gift } from "@/types/api/Gift";
import Modal from "@/components/Styled/Modal.vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import GiftGrid from "@/components/Styled/GiftGrid.vue";
import GiftList from "@/components/Styled/GiftList.vue";
import Table from "@/components/Styled/Table.vue";
import ListGridToggleButton from "@/components/Styled/ListGridToggleButton.vue";

import { CogIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "List",
	components: {
		CogIcon,
		DefaultLayout,
		GiftGrid,
		GiftList,
		ListGridToggleButton,
		Modal,
		Table,
	},
	setup() {
		const { dispatch, state, getters } = useStore();
		const router = useRouter();
		const listId = router.currentRoute.value.params.id;
		const listName = "Ma liste";
		const auth = ref(inject("Auth") as any);

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

		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const list = computed(() => getters.getListById(listId));
		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);

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

		const modal = ref({
			showModal: false,
			title: labels.modals.deleteGift.title,
			confirmText: labels.modals.deleteGift.confirm,
			confirm: handleDeleteConfirm,
			gift: {} as Gift,
		});

		onMounted(() => {
			dispatch("initializePreferences", auth.value.user.sub);
			dispatch("initializeGifts", listId);
		});

		return {
			isListView: computed(() => {
				if (state.preferences.displayList === undefined) {
					return true;
				} else {
					return state.preferences.displayList;
				}
			}),
			labels,
			listName,
			gifts,
			handleDeleteModal,
			list,
			modal,
			router,
			tableHeaders,
			toggleDisplayMode,
			handleSort,
		};
	},
});
</script>
