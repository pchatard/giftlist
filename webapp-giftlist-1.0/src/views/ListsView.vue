<template>
	<DefaultLayout :title="labels.titles.lists">
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>
		<div v-else>
			<div
				v-if="lists.length === 0"
				class="absolute w-full h-full flex flex-col justify-center items-center text-gray-400 gap-8"
			>
				<div class="text-lg">{{ labels.lists.empty.description }}</div>
				<CollectionIcon class="w-1/6" />
				<GiftlistButton btn-style="primary-soft" @click="router.push(`/app/lists/new`)">
					{{ labels.lists.empty.button }}
				</GiftlistButton>
			</div>
			<div v-else>
				<GiftlistTable :headers="tableHeaders" @sort="handleSort">
					<tr
						v-for="list in lists"
						:key="list.id"
						class="cursor-pointer hover:bg-gray-50"
						@click="router.push(`/app/lists/${list.id}`)"
					>
						<ListItem :list="list" @delete="openDeleteModal" />
					</tr>
				</GiftlistTable>
			</div>

			<GiftlistModal
				:show="deleteModalIsOpen"
				@confirm="deleteList"
				@close="closeDeleteModal"
				type="danger"
				:title="labels.modals.deleteList.title + listToDelete?.title"
				:confirm-text="labels.modals.deleteList.confirm"
				:cancel-text="labels.modals.deleteList.cancel"
				:btn-loading="deleteModalButtonIsLoading"
			>
				<p class="text-sm text-gray-500">{{ labels.modals.deleteList.text }}</p>
				<p class="text-sm text-gray-500">{{ labels.modals.deleteList.text2 }}</p>
			</GiftlistModal>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistLoader from "@/components/GiftlistLoader.vue";
import GiftlistModal from "@/components/GiftlistModal.vue";
import GiftlistTable from "@/components/GiftlistTable.vue";
import ListItem from "@/components/ListItem.vue";

import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { CollectionIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ListsView",
	components: {
		GiftlistButton,
		DefaultLayout,
		ListItem,
		GiftlistTable,
		GiftlistModal,
		GiftlistLoader,
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
		const deleteModalButtonIsLoading = ref(false);
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
			deleteModalButtonIsLoading.value = true;
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
			setTimeout(() => {
				deleteModalButtonIsLoading.value = false;
			}, 300);
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
			deleteModalButtonIsLoading,
		};
	},
});
</script>
