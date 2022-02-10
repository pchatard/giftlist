<template>
	<DefaultLayout
		title="La liste de mon copain"
		back
		:backButtonTitle="backButtonTitle"
		:backButtonLink="router.options.history.state.back"
	>
		<template v-slot:commands>
			<ListGridToggleButton :isGridView="!isListView" class="w-28" @change="toggleDisplayMode" />
		</template>

		<div
			v-if="!isListView"
			class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-8"
		>
			<GiftGrid v-for="gift in gifts" :key="gift.id" :gift="gift" :shared="true" />
		</div>
		<Table v-else :headers="tableHeaders" @sort="handleSort">
			<tr
				v-for="gift in gifts"
				:key="gift.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="handleDetailsModal(gift)"
			>
				<GiftList :gift="gift" :shared="true" @book="handleBookModal" />
			</tr>
		</Table>

		<Modal
			:show="modal.showModal"
			:title="modal.title"
			:confirmText="modal.confirmText"
			:cancelText="modal.cancelText"
			@close="modal.showModal = false"
			@confirm="modal.confirm"
		>
			<GiftDetails v-if="selectedGift" :gift="selectedGift" />
		</Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Gift } from "@/types/api/Gift";
import Modal from "@/components/Styled/Modal.vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import GiftGrid from "@/components/Styled/GiftGrid.vue";
import GiftList from "@/components/Styled/GiftList.vue";
import GiftDetails from "@/components/Gift/GiftDetails.vue";
import ListGridToggleButton from "@/components/Styled/ListGridToggleButton.vue";
import Table from "@/components/Styled/Table.vue";

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
		GiftDetails,
		GiftGrid,
		GiftList,
		ListGridToggleButton,
		Modal,
		Table,
	},
	setup() {
		const { dispatch, state } = useStore();
		const router = useRouter();
		const listCode = router.currentRoute.value.params.code;
		const auth = ref(inject("Auth") as any);

		onMounted(() => {
			dispatch("initializeGifts", listCode);
			dispatch("initializePreferences", auth.value.user.sub);
		});

		const backButtonTitle = computed(() => {
			const previous = router.options.history.state.back;
			if (previous?.toString().includes("/app/booked")) {
				return "Mes cadeaux réservés";
			} else {
				return "Mes listes partagées";
			}
		});

		const tableHeaders = ref([
			{ title: "Favori", width: "w-10 text-center", sortable: true, sorted: "none" },
			{ title: "Titre", sortable: true, sorted: "none" },
			{ title: "Type", sortable: true, sorted: "none" },
			{ title: "Status", sortable: true, sorted: "none" },
			{ title: "Date d'ajout", sortable: true, sorted: "none" },
			{ title: "Prix", sortable: true, sorted: "none" },
		]);

		const handleSort = (headers: Array<any>) => {
			tableHeaders.value = headers;

			// TODO : Sort displayed data depending on tableHeaders sorted properties
		};

		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);

		const selectedGift = ref();

		const toggleDisplayMode = () => {
			console.log("Grid mode is disabled for now");
			// dispatch("toggleListDisplayMode");
		};

		const openLinkInNewTab = () => {
			const link = "https://www.google.com";
			window.open(link, "_blank");
			self.focus();
		};

		const handleBookModal = (gift: Gift) => {
			modal.value.title = "Réserver " + gift.title;
			modal.value.confirmText = "Réserver";
			modal.value.cancelText = "Annuler";
			modal.value.showModal = true;
			modal.value.confirm = handleBookConfirm;
			selectedGift.value = null;
		};

		const handleBookConfirm = () => {
			dispatch("bookGift");
			modal.value.showModal = false;
		};

		const handleDetailsModal = (gift: Gift) => {
			modal.value.title = gift.title;
			modal.value.confirmText = "Réserver";
			modal.value.cancelText = "Fermer";
			modal.value.showModal = true;
			modal.value.confirm = handleDetailsConfirm;
			selectedGift.value = gift;
		};

		const handleDetailsConfirm = () => {
			handleBookModal(selectedGift.value);
		};

		const modal = ref({
			showModal: false,
			title: "",
			confirmText: "",
			cancelText: "",
			confirm: handleDetailsConfirm,
		});

		return {
			isListView: computed(() => {
				if (state.preferences.displayList === undefined) {
					return true;
				} else {
					return state.preferences.displayList;
				}
			}),
			gifts,
			handleBookModal,
			handleDetailsModal,
			modal,
			openLinkInNewTab,
			router,
			tableHeaders,
			toggleDisplayMode,
			selectedGift,
			handleSort,
			backButtonTitle,
		};
	},
});
</script>
