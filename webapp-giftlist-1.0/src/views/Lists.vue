<template>
	<DefaultLayout title="Mes listes">
		<Table :headers="tableHeaders">
			<tr
				v-for="i in 5"
				:key="i"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/lists/${i}`)"
			>
				<TableData>
					<div class="flex items-center">
						<ViewListIcon class="w-5 h-5 mr-4 text-yellow-400" />
						<div>
							<div class="text-sm font-medium text-gray-900 whitespace-normal">
								Liste {{ i }}
							</div>
							<div class="text-sm text-gray-500">Sous-titre</div>
						</div>
					</div>
				</TableData>
				<TableData>
					<div class="text-sm text-gray-500">Moi</div>
				</TableData>
				<TableData>
					<span
						class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
						:class="{
							'bg-red-100 text-red-800': !(i % 2),
							'bg-green-100 text-green-800': i % 2,
						}"
					>
						{{ i % 2 ? "Public" : "Private" }}
					</span>
				</TableData>
				<TableData class="text-sm text-gray-500" content="Aujourd'hui" />
				<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
					<button
						@click.stop=""
						class="mx-4 text-indigo-600 font-medium hover:text-indigo-900"
					>
						Options
					</button>
					<button
						@click.stop="() => deleteList(i)"
						class="ml-4 text-red-600 font-medium hover:text-red-900"
					>
						Supprimer
					</button>
				</td>
			</tr>
		</Table>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import { useRouter } from "vue-router";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Table from "@/components/Styled/Table.vue";
import TableData from "@/components/Styled/TableData.vue";
import { ViewListIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
		Table,
		TableData,
		ViewListIcon,
	},
	setup() {
		const { dispatch } = useStore();
		const router = useRouter();

		const tableHeaders = ["Nom", "Propriétaire", "Status", "Dernière modification"];

		const deleteList = async (listId: string) => {
			dispatch("deleteList", listId)
				.then(() => {
					console.debug("Lists - deleteList - Successfully deleted list " + listId);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		return {
			deleteList,
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
