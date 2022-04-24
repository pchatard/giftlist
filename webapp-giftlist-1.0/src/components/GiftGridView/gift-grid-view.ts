import { computed, defineComponent, inject, PropType } from "vue";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import labels from "@/labels/fr/labels.json";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
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

export default defineComponent({
	name: "GiftGridView",
	components: {
		Button,
		CurrencyEuroIcon,
		ExternalLinkIcon,
		HeartIcon,
		ShoppingCartIcon,
		UserCircleIcon,
		TrashIcon,
		TicketIcon,
		HeartIconOutline,
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

		return {
			labels,
			price,
			favGift,
			unfavGift,
			openInNewTab,
			openBookGiftModal,
			openDeleteGiftModal,
		};
	},
});
