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
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";

import { List } from "@/types/List";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import Table from "@/components/Styled/Table.vue";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
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

export const sharedListsNavbarCta = (): void => {
	console.debug(
		"SharedLists - sharedListsNavbarCta - Redirecting or Opening popup to add a sharing code"
	);
	router.push("/app/shared/new");
};
</script>
