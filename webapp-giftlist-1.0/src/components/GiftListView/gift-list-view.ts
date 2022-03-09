import { defineComponent, PropType, toRefs } from "vue";
import { useStore } from "vuex";

import TableData from "@/components/TableData/TableData.vue";
import labels from "@/labels/fr/labels.json";
import { Gift } from "@/types/api/Gift";
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
			type: Object as PropType<Gift>,
			required: true,
		},
		shared: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["book", "details", "delete"],
	setup(props, context) {
		const random = Math.random() > 0.5;
		const { dispatch } = useStore();
		const { emit } = context;
		const { gift } = toRefs(props);

		const openBookGiftModal = () => {
			const currentGift = gift.value;
			if (!currentGift.isBooked) {
				emit("book", gift.value);
			}
		};

		const openDeleteGiftModal = () => {
			emit("delete", gift.value);
		};

		const openLinkInNewTab = () => {
			const link = "https://www.google.com";
			window.open(link, "_blank");
			self.focus();
		};

		const toggleFavoriteStatus = () => {
			if (!props.shared) {
				dispatch("favoritizeGift");
			}
		};

		return {
			labels,
			openBookGiftModal,
			openDeleteGiftModal,
			openLinkInNewTab,
			random,
			toggleFavoriteStatus,
		};
	},
});
