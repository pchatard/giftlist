<template>
	<DefaultLayout title="Ma liste">
		<template v-slot:commands>
			<Button @click="router.push(`/app/lists/${list.id}/settings`)" class="mr-4">
				<template v-slot:icon>
					<CogIcon class="h-4 w-4 mr-2" />
				</template>
				Paramètres
			</Button>
			<ListGridToggleButton :isGridView="isGridView" class="w-28" @change="toggleDisplayMode" />
		</template>

		<div
			v-if="isGridView"
			class="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-4 gap-y-8"
		>
			<GiftGrid v-for="gift in gifts" :key="gift.id" :gift="gift" />
		</div>
		<Table v-else :headers="tableHeaders">
			<tr
				v-for="gift in gifts"
				:key="gift.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${list.id}/gift/${gift.id}`)"
			>
				<GiftList :gift="gift" />
			</tr>
		</Table>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from "vue";
import router from "@/router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Gift from "@/types/Gift";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import GiftGrid from "@/components/Styled/GiftGrid.vue";
import GiftList from "@/components/Styled/GiftList.vue";
import Table from "@/components/Styled/Table.vue";
import ListGridToggleButton from "@/components/Styled/ListGridToggleButton.vue";

import { CogIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "List",
	components: {
		Button,
		CogIcon,
		DefaultLayout,
		GiftGrid,
		GiftList,
		Table,
		ListGridToggleButton,
	},
	setup() {
		const { dispatch, state, getters } = useStore();
		const router = useRouter();
		const listId = router.currentRoute.value.params.id;

		const tableHeaders = ref([
			{ title: "Favori", width: "w-10 text-center" },
			{ title: "Titre" },
			{ title: "Type" },
			{ title: "Date d'ajout" },
			{ title: "Prix" },
		]);

		const list = computed(() => getters.getListById(listId));
		const gifts: ComputedRef<Gift[]> = computed(() => state.gift.gifts);

		const toggleDisplayMode = () => {
			dispatch("toggleListDisplayMode");
		};

		onMounted(() => {
			dispatch("initializeLists");
			dispatch("initializeGifts", listId);
		});

		return {
			isGridView: computed(() => state.preferences.listDisplayModeIsGrid),
			gifts,
			list,
			router,
			tableHeaders,
			toggleDisplayMode,
		};
	},
});

export const listNavbarCta = (): void => {
	const listId = router.currentRoute.value.params.id;
	console.debug("List - listNavbarCta - CTA for list " + listId);
	router.push(`/app/lists/${listId}/new-gift`);
};
</script>
