import { defineComponent, PropType } from "vue";

import Button from "@/components/Button/Button.vue";
import { Gift } from "@/types/api/Gift";
import { ExternalLinkIcon, PencilIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/vue/outline";
import { HeartIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "GiftGridView",
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
