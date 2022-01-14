<template>
	<TableData>
		<ViewListIcon class="w-5 h-5 mx-auto text-yellow-400" />
	</TableData>
	<TableData>
		<div class="flex items-center">
			<div>
				<div class="text-sm font-medium text-gray-900 whitespace-normal">{{ list.title }}</div>
				<div v-if="shared" class="text-sm text-gray-500">
					{{ list.gifts.length }} idées cadeaux
				</div>
				<div v-else class="text-sm text-gray-500">Sous-titre</div>
			</div>
		</div>
	</TableData>
	<TableData>
		<div class="text-sm text-gray-500">{{ shared ? "Mon copain" : "Moi" }}</div>
	</TableData>
	<TableData v-show="!shared">
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
			:class="{
				'bg-red-100 text-red-800': !list.isShared,
				'bg-green-100 text-green-800': list.isShared,
			}"
		>
			{{ list.isShared ? "Public" : "Private" }}
		</span>
	</TableData>
	<TableData class="text-sm text-gray-500" content="Aujourd'hui" />
	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			v-show="shared"
			@click.stop="$emit('details', list)"
			class="mx-2 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-indigo-100 rounded-md">
				<InformationCircleIcon class="h-4 w-4 mr-2" />
				Détails
			</span>
		</button>
		<button
			v-show="!shared"
			@click.stop="router.push(`/app/lists/${list.id}/settings`)"
			class="mx-2 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-indigo-100 rounded-md">
				<CogIcon class="h-4 w-4 mr-2" />
				Options
			</span>
		</button>
		<button
			v-show="!shared"
			@click.stop="$emit('delete', list)"
			class="ml-2 text-red-600 font-medium hover:text-red-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-red-100 rounded-md">
				<TrashIcon class="h-4 w-4 mr-2" />
				Supprimer
			</span>
		</button>
	</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TableData from "@/components/Styled/TableData.vue";
import { TrashIcon, ViewListIcon, InformationCircleIcon, CogIcon } from "@heroicons/vue/outline";
import { List } from "@/types/api/List";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "ListItem",
	components: {
		InformationCircleIcon,
		TableData,
		TrashIcon,
		ViewListIcon,
		CogIcon,
	},
	emits: ["delete", "details"],
	props: {
		list: {
			type: Object as PropType<List>,
			required: true,
		},
		shared: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const router = useRouter();

		return {
			router,
		};
	},
});
</script>
