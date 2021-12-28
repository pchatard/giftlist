<template>
	<DefaultLayout title="Les listes de mes copains">
		<Table :headers="tableHeaders">
			<tr
				v-for="list in lists"
				:key="list.sharingCode"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/shared/${list.sharingCode}`)"
			>
				<ListItem :list="list" :shared="true" @details="handleDetailsModal" />
			</tr>
		</Table>

		<Modal
			:show="newSharingCodeModalIsOpen"
			@confirm="confirmNewSharingCode"
			@close="closeNewSharingCodeModal"
			title="Nouveau code de partage"
			confirmText="Valider"
			cancelText="Annuler"
		>
			<p class="text-sm text-gray-500">Add an input here</p>
			<p class="text-sm text-red-500">
				{{ sharingCodeInputErrorMessage }}
			</p>
		</Modal>

		<Modal
			:show="detailsModal.show"
			@close="handleDetailsModal"
			@confirm="openList"
			:title="detailsModal.list.title || ''"
			confirmText="Ouvrir"
		>
			<p>Détails de la liste</p>
			<p>Propriétaire(s):</p>
			<p>Nombre de cadeaux disponibles / réservés</p>
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";

import { List } from "@/types/api/List";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Modal from "@/components/Styled/Modal.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import Table from "@/components/Styled/Table.vue";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
		Modal,
		ListItem,
		Table,
	},
	setup() {
		const router = useRouter();
		const { dispatch, state } = useStore();

		const tableHeaders = [
			{ title: "", width: "w-8" },
			{ title: "Nom" },
			{ title: "Propriétaire" },
			{ title: "Date d'échéance" },
		];

		const lists: ComputedRef<List[]> = computed(() => state.list.shared);

		const newSharingCodeModalIsOpen = computed(
			() => router.currentRoute.value.path === "/app/shared/new"
		);

		watch(newSharingCodeModalIsOpen, () => {
			if (!newSharingCodeModalIsOpen.value) {
				setTimeout(() => {
					sharingCodeInputErrorMessage.value = "";
				}, 500);
			}
		});

		const closeNewSharingCodeModal = () => {
			router.push("/app/shared");
		};

		const confirmNewSharingCode = () => {
			const sharingCode = "sharingCode";
			dispatch("getSharedList", sharingCode)
				.then(() => {
					router.push(`/app/shared/${sharingCode}`);
				})
				.catch((error) => {
					sharingCodeInputErrorMessage.value = error.message;
				});
		};

		const sharingCodeInputErrorMessage = ref("");

		const detailsModal = ref({
			show: false,
			list: {} as List,
		});

		const handleDetailsModal = (list?: List) => {
			detailsModal.value.show = !detailsModal.value.show;
			if (list) {
				detailsModal.value.list = list;
			}
		};

		const openList = () => {
			router.push("/app/shared/" + detailsModal.value.list.sharingCode);
		};

		onMounted(() => {
			dispatch("initializeLists");
		});

		return {
			detailsModal,
			handleDetailsModal,
			openList,
			newSharingCodeModalIsOpen,
			closeNewSharingCodeModal,
			confirmNewSharingCode,
			sharingCodeInputErrorMessage,
			lists,
			router,
			tableHeaders,
		};
	},
});

export const sharedListsNavbarCta = (): void => {
	console.debug("SharedLists - sharedListsNavbarCta - Opening new sharing code modal");
	router.push("/app/shared/new");
};
</script>
