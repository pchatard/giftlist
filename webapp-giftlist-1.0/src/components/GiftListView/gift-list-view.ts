import { defineComponent, inject, PropType, toRefs } from "vue";
import { useStore } from "vuex";

import TableData from "@/components/TableData/TableData.vue";
import labels from "@/labels/fr/labels.json";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import {
	ExternalLinkIcon,
	HeartIcon as HeartIconOutline,
	ShoppingCartIcon,
	TicketIcon,
	TrashIcon,
} from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "GiftListView",
	components: {
		ExternalLinkIcon,
		HeartIcon,
		HeartIconOutline,
		ShoppingCartIcon,
		TableData,
		TicketIcon,
		TrashIcon,
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
	emits: ["book", "details", "delete"],
	setup(props, { emit }) {
		const auth = inject("Auth") as Auth0Client;
		const { dispatch } = useStore();

		const openBookGiftModal = () => {
			const currentGift = props.gift;
			if (!currentGift.isBooked) {
				emit("book", props.gift);
			}
		};

		const openDeleteGiftModal = () => {
			emit("delete", props.gift);
		};

		const openLinkInNewTab = () => {
			if (props.gift.linkURL) {
				const link = "https://www.google.com";
				window.open(link, "_blank");
				self.focus();
			}
		};

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

		return {
			labels,
			openBookGiftModal,
			openDeleteGiftModal,
			openLinkInNewTab,
			favGift,
			unfavGift,
		};
	},
});
