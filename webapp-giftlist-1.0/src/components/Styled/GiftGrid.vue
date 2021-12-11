<template>
	<div class="max-w-sm min-w-sm border border-gray-200 shadow-md rounded-md p-4 relative">
		<HeartIcon
			v-show="gift.favorite"
			class="
				absolute
				w-10
				text-red-400
				top-0
				left-0
				transform
				-translate-x-1/2 -translate-y-1/3
				-rotate-12
				cursor-pointer
			"
		/>
		<div class="absolute top-2 right-2 flex" v-if="!shared">
			<router-link to="">
				<PencilIcon class="w-8 cursor-pointer rounded-md text-gray-400 p-1 hover:bg-gray-200" />
			</router-link>
			<a href="#" ref="noopener noreferrer">
				<ExternalLinkIcon
					class="w-8 cursor-pointer rounded-md text-gray-400 p-1 hover:bg-gray-200"
				/>
			</a>
			<TrashIcon
				class="
					w-8
					cursor-pointer
					rounded-md
					text-gray-400
					p-1
					hover:bg-red-200 hover:text-red-400
				"
			/>
		</div>
		<div class="flex items-stretch">
			<div class="w-1/4 p-4 pl-0 grid place-items-center">
				<ShoppingCartIcon class="w-10 text-indigo-600" />
			</div>
			<div class="flex flex-col items-start justify-center flex-1 pl-2">
				<div class="text-md font-bold">Titre</div>
				<div class="text-sm">Autres infos</div>
				<div class="text-md">13€</div>
			</div>
		</div>
		<div class="mt-4 flex gap-2" v-if="shared">
			<Button class="flex-1" btnStyle="secondary">Détails</Button>
			<Button class="flex-1">Réserver</Button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Gift from "@/types/Gift";

import Button from "@/components/Styled/Button.vue";
import { ExternalLinkIcon, PencilIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "GiftGrid",
	components: {
		Button,
		ExternalLinkIcon,
		HeartIcon,
		PencilIcon,
		ShoppingCartIcon,
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
});
</script>
