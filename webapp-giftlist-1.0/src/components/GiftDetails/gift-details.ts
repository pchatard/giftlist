import { defineComponent } from 'vue';

import labels from '@/labels/fr/labels.json';
import {
    AnnotationIcon, ChartBarIcon, ColorSwatchIcon, CurrencyEuroIcon, ExternalLinkIcon,
    ShoppingCartIcon, TagIcon
} from '@heroicons/vue/outline';

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
	setup() {
		return {
			labels,
		};
	},
});
