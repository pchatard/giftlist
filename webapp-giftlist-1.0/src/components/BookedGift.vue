<template>
	<div class="border border-secondary-hover shadow-sm rounded-md p-4 flex flex-col cursor-pointer">
		<div class="flex items-center">
			<ShoppingCartIcon class="w-12 p-3 mr-4 rounded-md bg-secondary-default text-logo" />
			<div class="flex flex-col">
				<span class="font-semibold">
					{{ gift.title }}
				</span>
				<div class="flex items-center">
					<CurrencyEuroIcon class="w-4 mr-1 text-primary-default" />
					<span class="text-sm">{{ price }}</span>
				</div>
			</div>
		</div>
		<div class="mt-4 flex justify-between items-center">
			<div>
				<div class="flex items-center">
					<UserCircleIcon class="w-5 mr-2 text-primary-default" />
					<span>
						<!-- {{ gift.owner }} -->
					</span>
				</div>
				<div class="flex items-center text-sm text-gray-500">
					<span>
						{{ gift.category }}
					</span>
				</div>
			</div>
			<ExternalLinkIcon v-if="gift.linkURL" class="w-5 text-gray-400 cursor-pointer hover:text-primary-default"
				@click.stop="openInNewTab" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { GiftDTO } from "@/types/dto/GiftDTO";

import {
	CurrencyEuroIcon,
	ExternalLinkIcon,
	ShoppingCartIcon,
	UserCircleIcon,
} from "@heroicons/vue/outline";

interface Props {
	gift: GiftDTO;
}

const props = defineProps<Props>();

const price = computed(() => {
	const giftPrice = props.gift.price;
	if (giftPrice) {
		return giftPrice.toFixed(2) + "€";
	}
	return "-";
});

const openInNewTab = () => {
	const link = props.gift.linkURL;
	window.open(link, "_blank");
	self.focus();
};
</script>
