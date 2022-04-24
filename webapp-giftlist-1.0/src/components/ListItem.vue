<template>
	<GiftlistTableData>
		<ViewListIcon class="w-5 h-5 mx-auto text-yellow-400" />
	</GiftlistTableData>
	<GiftlistTableData>
		<div class="flex items-center">
			<div class="text-sm font-medium text-gray-900 whitespace-normal">{{ list.title }}</div>
		</div>
	</GiftlistTableData>
	<GiftlistTableData>
		<div class="text-sm text-gray-500">{{ shared ? "Mon copain" : "Moi" }}</div>
	</GiftlistTableData>
	<GiftlistTableData v-show="!shared">
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
			:class="{
				'bg-red-100 text-red-800': !list.isShared,
				'bg-green-100 text-green-800': list.isShared,
			}"
		>
			{{ list.isShared ? labels.lists.status.public : labels.lists.status.private }}
		</span>
	</GiftlistTableData>
	<GiftlistTableData class="text-sm text-gray-500">
		{{ list.closureDate ? list.closureDate : "-" }}
	</GiftlistTableData>

	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			v-show="shared"
			@click.stop="$emit('details', list)"
			class="mx-2 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-indigo-100 rounded-md">
				<InformationCircleIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.info }}
			</span>
		</button>
		<button
			v-show="!shared"
			@click.stop="router.push(`/app/lists/${list.id}/settings`)"
			class="mx-2 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-indigo-100 rounded-md">
				<CogIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.settings }}
			</span>
		</button>
		<button
			v-show="!shared"
			@click.stop="$emit('delete', list)"
			class="ml-2 text-red-600 font-medium hover:text-red-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-red-100 rounded-md">
				<TrashIcon class="h-4 w-4 mr-2" />
				{{ labels.lists.buttons.delete }}
			</span>
		</button>
	</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import GiftlistTableData from "@/components/GiftlistTableData.vue";
import labels from "@/labels/fr/labels.json";
import { ListDTO } from "@/types/dto/ListDTO";
import { CogIcon, InformationCircleIcon, TrashIcon, ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ListItem",
	components: {
		InformationCircleIcon,
		GiftlistTableData,
		TrashIcon,
		ViewListIcon,
		CogIcon,
	},
	emits: ["delete", "details"],
	props: {
		list: {
			type: Object as PropType<ListDTO>,
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
			labels,
		};
	},
});
</script>
