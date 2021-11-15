<template>
	<DefaultLayout title="Les listes de mes copains">
		<Table :headers="tableHeaders">
			<tr
				v-for="i in 5"
				:key="i"
				class="cursor-pointer hover:bg-gray-50"
				@click="router.push(`/app/shared/${i}`)"
			>
				<TableData>
					<div class="flex items-center">
						<ViewListIcon class="w-5 h-5 mr-4 text-yellow-400" />
						<div>
							<div class="text-sm font-medium text-gray-900 whitespace-normal">
								Liste {{ i }}
							</div>
							<div class="text-sm text-gray-500">12 idées cadeaux</div>
						</div>
					</div>
				</TableData>
				<TableData>
					<div class="text-sm text-gray-500">Mon copain</div>
				</TableData>
				<TableData class="text-sm text-gray-500" content="Aujourd'hui" />
				<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
					<button
						@click.stop=""
						class="mx-4 text-indigo-600 font-medium hover:text-indigo-900"
					>
						Détails
					</button>
				</td>
			</tr>
		</Table>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Table from "@/components/Styled/Table.vue";
import TableData from "@/components/Styled/TableData.vue";
import { ViewListIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
		Table,
		TableData,
		ViewListIcon,
	},
	setup() {
		const tableHeaders = ["Nom", "Propriétaire", "Date de création"];

		const router = useRouter();

		return {
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
