<template>
	<div class="flex flex-col divide-y">
		<div class="py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center my-2">
					<ShoppingCartIcon class="w-12 p-3 rounded-md bg-gray-100 text-yellow-400" />
					<span class="ml-2">Catégorie</span>
				</div>
				<div class="my-2 flex items-center">
					<CurrencyEuroIcon class="w-5 text-indigo-600" />
					<span class="ml-2">13.00€</span>
				</div>
			</div>
			<div class="my-2 flex">
				<a
					href="https://google.com"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center text-indigo-600 hover:text-indigo-900"
				>
					<ExternalLinkIcon class="h-4 w-4 mr-2" />
					Ouvrir dans un nouvel onglet
				</a>
			</div>
		</div>
		<div class="py-4">
			<div class="flex items-center">
				<div class="flex flex-col flex-1 pr-4">
					<div class="flex items-center">
						<TagIcon class="w-4 text-indigo-600" />
						<span class="ml-2">Marque</span>
					</div>
					<span class="font-semibold">Nike</span>
				</div>
				<div class="flex flex-col flex-1 px-4">
					<div class="flex items-center">
						<ChartBarIcon class="w-4 text-indigo-600" />
						<span class="ml-2">Taille</span>
					</div>
					<span class="font-semibold">M</span>
				</div>
				<div class="flex flex-col flex-1 pl-4">
					<div class="flex items-center">
						<ColorSwatchIcon class="w-4 text-indigo-600" />
						<span class="ml-2">Couleur</span>
					</div>
					<span class="font-semibold">Blanc</span>
				</div>
			</div>
			<div class="flex flex-col flex-1 my-2">
				<div class="flex items-center">
					<AnnotationIcon class="w-4 text-indigo-600" />
					<span class="ml-2">Commentaires</span>
				</div>
				<span class="text-gray-600">Attention à ne pas prendre la mauvaise couleur</span>
			</div>
		</div>
		<div class="py-4">Ce cadeau est disponible !</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
	AnnotationIcon,
	ShoppingCartIcon,
	ExternalLinkIcon,
	CurrencyEuroIcon,
	ColorSwatchIcon,
	ChartBarIcon,
	TagIcon,
} from "@heroicons/vue/outline";

export default defineComponent({
	name: "GiftDetails",
	components: {
		AnnotationIcon,
		CurrencyEuroIcon,
		ChartBarIcon,
		ColorSwatchIcon,
		ExternalLinkIcon,
		ShoppingCartIcon,
		TagIcon,
	},
	props: {
		gift: Object,
	},
});
</script>
