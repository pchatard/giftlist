<template>
	<TableData class="">
		<HeartIcon
			v-show="gift.isFavorite"
			@click.stop="toggleFavoriteStatus"
			class="w-7 h-7 mx-auto text-red-400 cursor-pointer"
		/>
		<HeartIconOutline
			v-show="!gift.isFavorite"
			class="w-7 h-7 mx-auto text-gray-400 cursor-pointer"
			@click.stop="toggleFavoriteStatus"
		/>
	</TableData>
	<TableData>
		<div>
			<div class="text-sm font-medium text-gray-900 whitespace-normal">
				{{ gift.title || "Cadeau" }}
			</div>
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
				'bg-red-100 text-red-800': gift.isBooked,
				'bg-green-100 text-green-800': !gift.isBooked,
			}"
		>
			{{ gift.isBooked ? "Réservé" : "Disponible" }}
		</span>
	</TableData>
	<TableData class="text-sm text-gray-500" content="Aujourd'hui" />
	<TableData>
		<div class="text-sm text-gray-500">13.00€</div>
	</TableData>
	<td v-if="shared" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			@click.stop="openGiftDetails"
			class="ml-4 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center">
				<InformationCircleIcon class="h-4 w-4 mr-2" />
				Détails
			</span>
		</button>
		<button
			@click.stop="openLinkInNewTab"
			class="ml-4 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center">
				<ExternalLinkIcon class="h-4 w-4 mr-2" />
				Ouvrir
			</span>
		</button>
		<button
			@click.stop="openBookGiftModal"
			class="ml-4 font-medium"
			:class="!gift.isBooked ? 'text-red-600 hover:text-red-900' : 'text-gray-400 line-through'"
		>
			<span class="flex items-center">
				<TicketIcon class="h-4 w-4 mr-2" />
				Réserver
			</span>
		</button>
	</td>
	<td v-else class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			@click.stop="openLinkInNewTab"
			class="mx-4 text-indigo-600 font-medium hover:text-indigo-900"
		>
			<span class="flex items-center">
				<ExternalLinkIcon class="h-4 w-4 mr-2" />
				Ouvrir
			</span>
		</button>
		<button
			@click.stop="openDeleteGiftModal"
			class="ml-4 items-center text-red-600 font-medium hover:text-red-900"
		>
			<span class="flex items-center">
				<TrashIcon class="h-4 w-4 mr-2" />
				Supprimer
			</span>
		</button>
	</td>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";

import { Gift } from "@/types/api/Gift";

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
import { useStore } from "vuex";

export default defineComponent({
	name: "GiftList",
	components: {
		ExternalLinkIcon,
		InformationCircleIcon,
		HeartIcon,
		HeartIconOutline,
		ShoppingCartIcon,
		TableData,
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
	emits: ["book", "details", "delete"],
	setup(props, context) {
		const random = Math.random() > 0.5;
		const { dispatch } = useStore();
		const { emit } = context;
		const { gift } = toRefs(props);

		const openBookGiftModal = () => {
			const currentGift = gift.value;
			if (!currentGift.isBooked) {
				emit("book", gift.value);
			}
		};

		const openDeleteGiftModal = () => {
			emit("delete", gift.value);
		};

		const openGiftDetails = () => {
			emit("details", gift.value);
		};

		const openLinkInNewTab = () => {
			const link = "https://www.google.com";
			window.open(link, "_blank");
			self.focus();
		};

		const toggleFavoriteStatus = () => {
			if (!props.shared) {
				dispatch("favoritizeGift");
			}
		};

		return {
			openBookGiftModal,
			openDeleteGiftModal,
			openGiftDetails,
			openLinkInNewTab,
			random,
			toggleFavoriteStatus,
		};
	},
});
</script>
