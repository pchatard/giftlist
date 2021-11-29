<template>
	<DefaultLayout title="La liste de mon copain">
		<template v-slot:commands>
			<ListGridToggleButton :isGridView="isGridView" class="w-28" @change="toggleDisplayMode" />
		</template>

		<div
			v-if="isGridView"
			class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-8"
		>
			<GiftGrid v-for="gift in gifts" :key="gift.id" :gift="gift" :shared="true" />
		</div>
		<Table v-else :headers="tableHeaders">
			<tr
				v-for="gift in gifts"
				:key="gift.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="openLinkInNewTab"
			>
				<GiftList
					:gift="gift"
					:shared="true"
					@book="handleBookModal"
					@details="handleDetailsModal"
				/>
			</tr>
		</Table>

		<Modal
			:show="modal.showModal"
			:title="modal.title"
			:confirmText="modal.confirmText"
			:cancelText="modal.cancelText"
			@close="modal.showModal = false"
			@confirm="modal.confirm"
		></Modal>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Gift from "@/types/Gift";
import Modal from "@/components/Styled/Modal.vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import GiftGrid from "@/components/Styled/GiftGrid.vue";
import GiftList from "@/components/Styled/GiftList.vue";
import ListGridToggleButton from "@/components/Styled/ListGridToggleButton.vue";
import Table from "@/components/Styled/Table.vue";

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
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

		const tableHeaders = ref([
			{ title: "Favori", width: "w-10 text-center" },
			{ title: "Titre" },
			{ title: "Type" },
			{ title: "Status" },
			{ title: "Date d'ajout" },
			{ title: "Prix" },
		]);
		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);

		const toggleDisplayMode = () => {
			dispatch("toggleListDisplayMode");
		};

		const openLinkInNewTab = () => {
			const link = "https://www.google.com";
			console.debug("SharedList - openLinkInNewTab - Opening " + link);
			window.open(link, "_blank");
			self.focus();
		};

		const handleBookModal = (gift: Gift) => {
			console.debug("SharedList - handleBookConfirm - Opening book gift modal");
			modal.value.title = "Réserver " + gift.id;
			modal.value.confirmText = "Réserver";
			modal.value.cancelText = "Annuler";
			modal.value.showModal = true;
			modal.value.confirm = handleBookConfirm;
			modal.value.gift = gift;
		};

		const handleBookConfirm = () => {
			console.debug("SharedList - handleBookConfirm - Booking gift");
			dispatch("bookGift");
			modal.value.showModal = false;
		};

		const handleDetailsModal = (gift: Gift) => {
			console.debug("SharedList - handleDetailsModal - Opening gift details modal");
			modal.value.title = "Détails de " + gift.id;
			modal.value.confirmText = "Réserver";
			modal.value.cancelText = "Fermer";
			modal.value.showModal = true;
			modal.value.confirm = handleDetailsConfirm;
			modal.value.gift = gift;
		};

		const handleDetailsConfirm = () => {
			console.debug("SharedList - handleDetailsConfirm - Opening book gift modal");
			handleBookModal(modal.value.gift);
		};

		const modal = ref({
			showModal: false,
			title: "",
			confirmText: "",
			cancelText: "",
			confirm: handleDetailsConfirm,
			gift: {} as Gift,
		});

		onMounted(() => {
			dispatch("initializeGifts", listCode);
		});

		return {
			isGridView: computed(() => state.preferences.listDisplayModeIsGrid),
			gifts,
			handleBookModal,
			handleDetailsModal,
			modal,
			openLinkInNewTab,
			router,
			tableHeaders,
			toggleDisplayMode,
		};
	},
});
</script>
