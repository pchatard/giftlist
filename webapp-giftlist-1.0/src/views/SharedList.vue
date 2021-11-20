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
				@click="router.push(`/app/lists/${i}`)"
			>
				<GiftList :gift="gift" :shared="true" />
			</tr>
		</Table>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Gift from "@/types/Gift";

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

		onMounted(() => {
			dispatch("initializeGifts", listCode);
		});

		return {
			isGridView: computed(() => state.preferences.listDisplayModeIsGrid),
			gifts,
			router,
			tableHeaders,
			toggleDisplayMode,
		};
	},
});
</script>
