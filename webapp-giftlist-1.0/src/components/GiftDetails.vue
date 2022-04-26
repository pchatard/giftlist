<template>
	<div class="flex flex-col divide-y">
		<div class="py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center my-2">
					<ShoppingCartIcon class="w-12 p-3 rounded-md bg-gray-100 text-yellow-400" />
					<span class="ml-2">{{ gift.category }}</span>
				</div>
				<div class="my-2 flex items-center">
					<CurrencyEuroIcon class="w-5 text-indigo-600" />
					<span class="ml-2">{{ gift.price ? gift.price + "€" : "-" }}</span>
				</div>
			</div>
			<div class="my-2 flex">
				<a
					v-if="gift.linkURL"
					:href="gift.linkURL ? gift.linkURL : '#'"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center text-indigo-600 hover:text-indigo-900"
				>
					<ExternalLinkIcon class="h-4 w-4 mr-2" />
					{{ labels.modals.giftDetails.openNewTab }}
				</a>
			</div>
		</div>
		<div class="py-4">
			<div class="flex items-center">
				<div class="flex flex-col flex-1 pr-4">
					<div class="flex items-center">
						<TagIcon class="w-4 text-indigo-600" />
						<span class="ml-2">{{ labels.modals.giftDetails.brand }}</span>
					</div>
					<span class="font-semibold">{{ gift.brand || "-" }}</span>
				</div>
				<div class="flex flex-col flex-1 px-4">
					<div class="flex items-center">
						<ChartBarIcon class="w-4 text-indigo-600" />
						<span class="ml-2">{{ labels.modals.giftDetails.size }}</span>
					</div>
					<span class="font-semibold">{{ gift.size || "-" }}</span>
				</div>
				<div class="flex flex-col flex-1 pl-4">
					<div class="flex items-center">
						<ColorSwatchIcon class="w-4 text-indigo-600" />
						<span class="ml-2">{{ labels.modals.giftDetails.color }}</span>
					</div>
					<span class="font-semibold">{{ gift.color || "-" }}</span>
				</div>
			</div>
			<div class="flex flex-col flex-1 my-2">
				<div class="flex items-center">
					<AnnotationIcon class="w-4 text-indigo-600" />
					<span class="ml-2">{{ labels.modals.giftDetails.comments }}</span>
				</div>
				<span class="text-gray-600">{{ gift.comments || "-" }}</span>
			</div>
		</div>
		<div class="py-4">{{ labels.modals.giftDetails.detailsStatus.available }}</div>
	</div>
</template>

<script setup lang="ts">
import labels from "@/labels/fr/labels.json";
import { GiftDTO } from "@/types/dto/GiftDTO.ts";

import {
	AnnotationIcon,
	ChartBarIcon,
	ColorSwatchIcon,
	CurrencyEuroIcon,
	ExternalLinkIcon,
	ShoppingCartIcon,
	TagIcon,
} from "@heroicons/vue/outline";

interface Props {
	gift: GiftDTO;
}

defineProps<Props>();
</script>
