import { computed, defineComponent, PropType } from "vue";

import { GiftDTO } from "@/types/dto/GiftDTO";
import {
	CurrencyEuroIcon,
	ExternalLinkIcon,
	ShoppingCartIcon,
	UserCircleIcon,
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
			type: Object as PropType<GiftDTO>,
			required: true,
		},
	},
	setup(props) {
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

		return { price, openInNewTab };
	},
});
