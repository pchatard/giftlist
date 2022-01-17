<template>
	<div class="border border-gray-200 shadow-sm rounded-md p-4 flex flex-col cursor-pointer">
		<div class="flex items-center">
			<ShoppingCartIcon class="w-12 p-3 mr-4 rounded-md bg-gray-100 text-yellow-400" />
			<div class="flex flex-col">
				<span class="font-semibold">
					{{ gift.title }}
				</span>
				<div class="flex items-center">
					<CurrencyEuroIcon class="w-4 mr-1 text-indigo-600" />
					<span class="text-sm">{{ price }}</span>
				</div>
			</div>
		</div>
		<div class="mt-4 flex justify-between items-center">
			<div>
				<div class="flex items-center">
					<UserCircleIcon class="w-5 mr-2 text-indigo-600" />
					<span>
						{{ gift.owner }}
					</span>
				</div>
				<div class="flex items-center text-sm text-gray-500">
					<span>
						{{ gift.list.name }}
					</span>
				</div>
			</div>
			<ExternalLinkIcon
				class="w-5 text-gray-400 cursor-pointer hover:text-indigo-600"
				@click.stop="openInNewTab"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import {
	ShoppingCartIcon,
	ExternalLinkIcon,
	UserCircleIcon,
	CurrencyEuroIcon,
} from "@heroicons/vue/outline";

export default defineComponent({
	name: "BookedGift",
	components: {
		ShoppingCartIcon,
		ExternalLinkIcon,
		UserCircleIcon,
		CurrencyEuroIcon,
	},
	props: {
		gift: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const price = computed(() => {
			return props.gift.price.toFixed(2) + "€";
		});

		const openInNewTab = () => {
			const link = "https://www.google.com";
			window.open(link, "_blank");
			self.focus();
		};

		return { price, openInNewTab };
	},
});
</script>
