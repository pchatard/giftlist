<template>
	<TableData class="">
		<HeartIcon v-show="gift.favorite" class="w-7 h-7 mx-auto text-red-400 cursor-pointer" />
		<HeartIconOutline
			v-show="!gift.favorite"
			class="w-7 h-7 mx-auto text-gray-400 cursor-pointer"
		/>
	</TableData>
	<TableData>
		<div>
			<div class="text-sm font-medium text-gray-900 whitespace-normal">Titre</div>
			<div class="text-sm text-gray-500">Autres infos</div>
		</div>
	</TableData>

	<TableData>
		<div class="flex flex-col justify-center">
			<ShoppingCartIcon class="w-5 h-5 mb-1 text-yellow-400" />
			<div class="text-sm text-gray-500">Vêtements</div>
		</div>
	</TableData>
	<TableData v-show="shared">
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
			:class="{
				'bg-red-100 text-red-800': !random,
				'bg-green-100 text-green-800': random,
			}"
		>
			{{ random ? "Disponible" : "Réservé" }}
		</span>
	</TableData>
	<TableData class="text-sm text-gray-500" content="Aujourd'hui" />
	<TableData>
		<div class="text-sm text-gray-500">13.00€</div>
	</TableData>
	<td v-if="shared" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button @click.stop="" class="ml-4 text-indigo-600 font-medium hover:text-indigo-900">
			<span class="flex items-center">
				<InformationCircleIcon class="h-4 w-4 mr-2" />
				Détails
			</span>
		</button>
		<button
			@click.stop=""
			class="ml-4 font-medium hover:text-red-900"
			:class="random ? 'text-red-600 hover:text-red-900' : 'text-gray-400 line-through'"
		>
			<span class="flex items-center">
				<TicketIcon class="h-4 w-4 mr-2" />
				Réserver
			</span>
		</button>
	</td>
	<td v-else class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			@click.stop="() => openLinkInNewTab('https://www.google.com/fr')"
			class="mx-4 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center">
				<ExternalLinkIcon class="h-4 w-4 mr-2" />
				Ouvrir
			</span>
		</button>
		<button @click.stop="" class="ml-4 items-center text-red-600 font-medium hover:text-red-900">
			<span class="flex items-center">
				<TrashIcon class="h-4 w-4 mr-2" />
				Supprimer
			</span>
		</button>
	</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Gift from "@/types/Gift";

import TableData from "@/components/Styled/TableData.vue";

import {
	ExternalLinkIcon,
	HeartIcon as HeartIconOutline,
	InformationCircleIcon,
	ShoppingCartIcon,
	TicketIcon,
	TrashIcon,
} from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "GiftList",
	components: {
		ExternalLinkIcon,
		InformationCircleIcon,
		HeartIcon,
		HeartIconOutline,
		TableData,
		ShoppingCartIcon,
		TicketIcon,
		TrashIcon,
	},
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
		shared: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const random = Math.random() > 0.5;

		const openLinkInNewTab = (link: string) => {
			window.open(link, "_blank");
			self.focus();
		};

		return {
			openLinkInNewTab,
			random,
		};
	},
});
</script>
