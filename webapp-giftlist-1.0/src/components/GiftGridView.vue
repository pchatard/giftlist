<template>
	<div class="border border-secondary-hover shadow-sm rounded-md p-4 flex flex-col cursor-pointer">
		<div class="flex items-center">
			<ShoppingCartIcon class="w-12 p-3 mr-4 rounded-md bg-secondary-default text-yellow-400" />
			<div class="flex flex-col">
				<span class="font-semibold">
					{{ gift.title }}
				</span>
				<div class="flex items-center">
					<CurrencyEuroIcon class="w-4 mr-1 text-primary-default" />
					<span class="text-sm">{{ price }}</span>
				</div>
			</div>
			<div class="ml-auto self-start flex gap-2 flex-col items-end justify-between">
				<HeartIcon
					v-if="gift.isFavorite"
					class="w-6 h-6 text-red-400 cursor-pointer"
					@click.stop="unfavGift"
				/>
				<HeartIconOutline
					v-else
					class="w-6 h-6 text-gray-400 cursor-pointer"
					@click.stop="favGift"
				/>
				<span
					v-if="shared"
					class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
					:class="{
						'bg-danger-light text-red-800': gift.isBooked,
						'bg-success-light text-green-800': !gift.isBooked,
					}"
				>
					{{ gift.isBooked ? labels.gifts.status.booked : labels.gifts.status.available }}
				</span>
			</div>
		</div>
		<div class="mt-4 flex justify-between items-center">
			<div>
				<div class="flex items-center text-sm text-gray-500">
					<span>
						{{ gift.category }}
					</span>
				</div>
				<div class="flex items-center">
					<UserCircleIcon class="w-5 mr-2 text-primary-default" />
					<span> Creator name </span>
				</div>
			</div>
			<div class="flex self-end gap-4">
				<ExternalLinkIcon
					v-if="gift.linkURL"
					class="w-6 text-gray-400 cursor-pointer hover:text-primary-default"
					@click.stop="openInNewTab"
				/>
				<TicketIcon
					v-if="shared"
					class="w-6 text-gray-400 cursor-pointer hover:text-danger-default"
					@click.stop="openBookGiftModal"
				/>
				<TrashIcon
					v-else
					class="w-6 text-gray-400 cursor-pointer hover:text-danger-default"
					@click.stop="openDeleteGiftModal"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useStore } from "vuex";
import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";

import {
	CurrencyEuroIcon,
	ExternalLinkIcon,
	HeartIcon as HeartIconOutline,
	ShoppingCartIcon,
	TicketIcon,
	TrashIcon,
	UserCircleIcon,
} from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

interface Props {
	gift: GiftDTO;
	shared?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	shared: false,
});

const emit = defineEmits<{
	(e: "book", gift: GiftDTO): void;
	(e: "delete", gift: GiftDTO): void;
}>();

const auth = inject("Auth") as Auth0Client;
const { dispatch } = useStore();

const price = computed(() => {
	const giftPrice = props.gift.price;
	if (giftPrice) {
		return giftPrice.toFixed(2) + " €";
	}
	return "-";
});

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

const openInNewTab = () => {
	const link = props.gift.linkURL;
	window.open(link, "_blank");
	self.focus();
};

const openBookGiftModal = () => {
	const currentGift = props.gift;
	if (!currentGift.isBooked) {
		emit("book", props.gift);
	}
};

const openDeleteGiftModal = () => {
	emit("delete", props.gift);
};
</script>
