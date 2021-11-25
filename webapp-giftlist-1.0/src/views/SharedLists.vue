<template>
	<DefaultLayout title="Les listes de mes copains">
		<Table :headers="tableHeaders">
			<tr
				v-for="list in lists"
				:key="list.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/shared/${list.id}`)"
			>
				<ListItem :list="list" :shared="true" />
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
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, onUpdated, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";

import { List } from "@/types/List";

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
			{ title: "Date de création" },
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

		onMounted(() => {
			dispatch("initializeLists");
		});

		return {
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
