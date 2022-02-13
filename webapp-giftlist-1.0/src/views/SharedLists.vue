<template>
	<DefaultLayout :title="labels.titles.shared">
		<Table :headers="tableHeaders" @sort="handleSort">
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
			:title="labels.modals.code.title"
			:confirmText="labels.modals.code.confirm"
			:cancelText="labels.modals.code.cancel"
		>
			<FormInputText
				:label="newSharingCodeData.label"
				:value="newSharingCodeData.code"
				:helperText="newSharingCodeData.helperText"
				:isError="newSharingCodeData.isError"
				:errorMessage="newSharingCodeData.errorMessage"
				:placeholder="newSharingCodeData.placeholder"
				@change="(newCode) => (newSharingCodeData.code = newCode)"
				focus
				reset
				@keydown.enter="confirmNewSharingCode"
			/>
		</Modal>

		<Modal
			:show="detailsModal.show"
			@close="handleDetailsModal"
			@confirm="openList"
			:title="detailsModal.list.title || ''"
			:confirmText="labels.modals.details.confirm"
		>
			<p>Détails de la liste</p>
			<p>Propriétaire(s):</p>
			<p>Nombre de cadeaux disponibles / réservés</p>
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";

import labels from "@/labels/fr/labels.json";

import { List } from "@/types/api/List";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Modal from "@/components/Styled/Modal.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import Table from "@/components/Styled/Table.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
		Modal,
		ListItem,
		Table,
		FormInputText,
	},
	setup() {
		const router = useRouter();
		const { dispatch, state } = useStore();
		const lists: ComputedRef<List[]> = computed(() => state.list.shared);

		const tableHeaders = ref([
			{ title: "", width: "w-8", sortable: false },
			{ title: labels.tables.list.title, sortable: true, sorted: "none" },
			{ title: labels.tables.list.owners, sortable: true, sorted: "none" },
			{ title: labels.tables.list.termDate, sortable: true, sorted: "none" },
		]);

		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const openList = () => {
			router.push("/app/shared/" + detailsModal.value.list.sharingCode);
		};

		// NEW CODE MODAL
		const newSharingCodeData = ref({
			code: "",
			errorMessage: "",
			isError: false,
			helperText: labels.modals.code.input.helperText,
			label: labels.modals.code.input.label,
			placeholder: labels.modals.code.input.placeholder,
		});
		const newSharingCodeModalIsOpen = computed(
			() => router.currentRoute.value.path === "/app/shared/new"
		);

		watch(
			() => newSharingCodeData.value.code,
			(val, old) => {
				if (val !== old) {
					newSharingCodeData.value.isError = false;
					newSharingCodeData.value.errorMessage = "";
				}
			}
		);

		watch(newSharingCodeModalIsOpen, () => {
			if (!newSharingCodeModalIsOpen.value) {
				setTimeout(() => {
					newSharingCodeData.value.errorMessage = "";
					newSharingCodeData.value.isError = false;
				}, 500);
			} else {
				newSharingCodeData.value.code = "";
			}
		});

		const closeNewSharingCodeModal = () => {
			router.push("/app/shared");
		};

		const confirmNewSharingCode = () => {
			dispatch("getSharedList", newSharingCodeData.value.code)
				.then(() => {
					router.push(`/app/shared/${newSharingCodeData.value.code}`);
				})
				.catch((error) => {
					newSharingCodeData.value.isError = true;
					newSharingCodeData.value.errorMessage = error.message;
				});
		};

		// DETAILS MODAL
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

		return {
			labels,
			router,
			lists,
			openList,
			tableHeaders,
			newSharingCodeData,
			newSharingCodeModalIsOpen,
			closeNewSharingCodeModal,
			confirmNewSharingCode,
			detailsModal,
			handleDetailsModal,
			handleSort,
		};
	},
});
</script>
