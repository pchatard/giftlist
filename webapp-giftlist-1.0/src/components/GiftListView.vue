<template>
	<GiftlistTableData>
		<HeartIcon
			v-if="gift.isFavorite"
			@click.stop="unfavGift"
			class="w-7 h-7 mx-auto text-red-400 cursor-pointer"
		/>
		<HeartIconOutline
			v-else
			class="w-7 h-7 mx-auto text-gray-400 cursor-pointer"
			@click.stop="favGift"
		/>
	</GiftlistTableData>
	<GiftlistTableData>
		<div>
			<div class="text-sm font-medium text-gray-900 whitespace-normal">
				{{ gift.title }}
			</div>
			<div v-if="gift.brand" class="text-sm text-gray-500">{{ gift.brand }}</div>
		</div>
	</GiftlistTableData>

	<GiftlistTableData>
		<div class="flex items-center">
			<ShoppingCartIcon class="w-5 h-5 text-yellow-400" />
			<div class="text-sm text-gray-500 ml-2">{{ gift.category }}</div>
		</div>
	</GiftlistTableData>
	<GiftlistTableData v-show="shared">
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
			:class="{
				'bg-red-100 text-red-800': gift.isBooked,
				'bg-green-100 text-green-800': !gift.isBooked,
			}"
		>
			{{ gift.isBooked ? labels.gifts.status.booked : labels.gifts.status.available }}
		</span>
	</GiftlistTableData>
	<GiftlistTableData class="text-sm text-gray-500" content="Aujourd'hui" />
	<GiftlistTableData>
		<div class="text-sm text-gray-500">{{ gift.price ? gift.price + "€" : "-" }}</div>
	</GiftlistTableData>
	<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		<button
			@click.stop="openLinkInNewTab"
			class="ml-4 font-medium"
			:class="
				gift.linkURL ? 'text-indigo-600 hover:text-indigo-900' : 'text-gray-400 line-through'
			"
		>
			<span
				class="flex items-center px-2 py-1 rounded-md"
				:class="gift.linkURL ? 'hover:bg-indigo-100' : ''"
			>
				<ExternalLinkIcon class="h-4 w-4 mr-2" />
				{{ labels.gifts.buttons.open }}
			</span>
		</button>
		<button
			v-if="shared"
			@click.stop="openBookGiftModal"
			class="ml-4 font-medium"
			:class="!gift.isBooked ? 'text-red-600 hover:text-red-900' : 'text-gray-400 line-through'"
		>
			<span
				class="flex items-center px-2 py-1 rounded-md"
				:class="!gift.isBooked ? 'hover:bg-red-100' : 'hover:bg-gray-100'"
			>
				<TicketIcon class="h-4 w-4 mr-2" />
				{{ labels.gifts.buttons.book }}
			</span>
		</button>
		<button
			v-else
			@click.stop="openDeleteGiftModal"
			class="ml-4 items-center text-red-600 font-medium hover:text-red-900"
		>
			<span class="flex items-center px-2 py-1 hover:bg-red-100 rounded-md">
				<TrashIcon class="h-4 w-4 mr-2" />
				{{ labels.gifts.buttons.delete }}
			</span>
		</button>
	</td>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from "vue";
import { useStore } from "vuex";

import GiftlistTableData from "@/components/GiftlistTableData.vue";
import labels from "@/labels/fr/labels.json";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import {
	ExternalLinkIcon,
	HeartIcon as HeartIconOutline,
	ShoppingCartIcon,
	TicketIcon,
	TrashIcon,
} from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "GiftListView",
	components: {
		ExternalLinkIcon,
		HeartIcon,
		HeartIconOutline,
		ShoppingCartIcon,
		GiftlistTableData,
		TicketIcon,
		TrashIcon,
	},
	props: {
		gift: {
			type: Object as PropType<GiftDTO>,
			required: true,
		},
		shared: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["book", "delete"],
	setup(props, { emit }) {
		const auth = inject("Auth") as Auth0Client;
		const { dispatch } = useStore();

		const openBookGiftModal = () => {
			const currentGift = props.gift;
			if (!currentGift.isBooked) {
				emit("book", props.gift);
			}
		};

		const openDeleteGiftModal = () => {
			emit("delete", props.gift);
		};

		const openLinkInNewTab = () => {
			if (props.gift.linkURL) {
				const link = "https://www.google.com";
				window.open(link, "_blank");
				self.focus();
			}
		};

		const favGift = () => {
			if (!props.shared) {
				const favPayload: GiftIdPayload = {
					auth,
					listId: props.gift.listId,
					giftId: props.gift.id,
				};
				dispatch("favGift", favPayload);
			}
		};

		const unfavGift = () => {
			if (!props.shared) {
				const favPayload: GiftIdPayload = {
					auth,
					listId: props.gift.listId,
					giftId: props.gift.id,
				};
				dispatch("unfavGift", favPayload);
			}
		};

		return {
			labels,
			openBookGiftModal,
			openDeleteGiftModal,
			openLinkInNewTab,
			favGift,
			unfavGift,
		};
	},
});
</script>
