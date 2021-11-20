<template>
	<DefaultLayout title="Mes listes">
		<Table :headers="tableHeaders">
			<tr
				v-for="list in lists"
				:key="list.id"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${list.id}`)"
			>
				<ListItem :list="list" />
			</tr>
		</Table>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import router from "@/router";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Table from "@/components/Styled/Table.vue";
import ListItem from "@/components/Styled/ListItem.vue";

import { List } from "@/types/List";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
		ListItem,
		Table,
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

		onMounted(() => {
			dispatch("initializeLists");
		});

		return {
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
