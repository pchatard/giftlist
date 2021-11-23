<template>
	<DefaultLayout title="Mes listes">
		<Table :headers="tableHeaders">
			<tr
				v-for="list in lists"
				:key="list.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${list.id}`)"
			>
				<ListItem :list="list" @delete="openDeleteModal" />
			</tr>
		</Table>

		<TransitionRoot appear :show="deleteModalIsOpen" as="template">
			<Dialog as="div" @close="closeDeleteModal">
				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div class="min-h-screen px-4 text-center">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0"
							enter-to="opacity-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100"
							leave-to="opacity-0"
						>
							<DialogOverlay class="fixed inset-0 bg-black bg-opacity-50" />
						</TransitionChild>

						<span class="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>

						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<div
								class="
									inline-block
									w-full
									max-w-md
									p-6
									my-8
									overflow-hidden
									text-left
									align-middle
									transition-all
									transform
									bg-white
									shadow-xl
									rounded-2xl
								"
							>
								<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
									Supprimer la liste {{ listToDelete.name }} ?
								</DialogTitle>
								<div class="mt-2">
									<p class="text-sm text-gray-500">
										Êtes-vous sûr de vouloir supprimer cette liste ?
									</p>
									<p class="text-sm text-gray-500">Cette action est irréversible.</p>
								</div>

								<div class="mt-4 flex justify-end">
									<button
										type="button"
										class="
											inline-flex
											justify-center
											px-4
											py-2
											mr-2
											text-sm
											font-medium
											text-gray-900
											bg-gray-100
											border border-transparent
											rounded-md
											hover:bg-gray-200
											focus:outline-none
											focus-visible:ring-2
											focus-visible:ring-offset-2
											focus-visible:ring-gray-500
										"
										@click="closeDeleteModal"
									>
										Annuler
									</button>
									<button
										type="button"
										class="
											inline-flex
											justify-center
											px-4
											py-2
											text-sm
											font-medium
											text-red-900
											bg-red-100
											border border-transparent
											rounded-md
											hover:bg-red-200
											focus:outline-none
											focus-visible:ring-2
											focus-visible:ring-offset-2
											focus-visible:ring-red-500
										"
										@click="deleteList"
									>
										Supprimer
									</button>
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import router from "@/router";
import { List } from "@/types/List";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Table from "@/components/Styled/Table.vue";
import ListItem from "@/components/Styled/ListItem.vue";

import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
	DialogTitle,
} from "@headlessui/vue";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
		ListItem,
		Table,
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	},
	setup() {
		const { dispatch, state } = useStore();
		const router = useRouter();

		const tableHeaders = [
			{ title: "", width: "w-8" },
			{ title: "Nom" },
			{ title: "Propriétaire" },
			{ title: "Status" },
			{ title: "Dernière modification" },
		];

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
					console.debug(
						"Lists - deleteList - Successfully deleted list " + listToDelete.value?.id
					);
					closeDeleteModal();
				})
				.catch((error) => {
					console.error(error);
				});
		};

		onMounted(() => {
			dispatch("initializeLists");
		});

		return {
			deleteModalIsOpen,
			listToDelete,
			openDeleteModal,
			closeDeleteModal,
			deleteList,
			lists,
			router,
			tableHeaders,
		};
	},
});

export const listsNavbarCta = (): void => {
	console.debug("Lists - listsNavbarCta - Redirecting to new list page");
	router.push("/app/lists/new");
};
</script>
