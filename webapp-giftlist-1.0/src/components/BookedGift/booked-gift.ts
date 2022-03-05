import { computed, defineComponent } from 'vue';

import {
    CurrencyEuroIcon, ExternalLinkIcon, ShoppingCartIcon, UserCircleIcon
} from '@heroicons/vue/outline';

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
