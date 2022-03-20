import { defineComponent, PropType } from "vue";

import labels from "@/labels/fr/labels.json";
import { ModalTypeEnum } from "@/types/ModalTypeEnum";
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";

export default defineComponent({
	name: "Modal",
	components: {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	},
	props: {
		type: {
			type: String as PropType<ModalTypeEnum>,
			default: ModalTypeEnum.NORMAL,
		},
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		confirmText: {
			type: String,
			required: false,
		},
		cancelText: {
			type: String,
			required: false,
			default: labels.modals.defaults.cancel,
		},
	},
	emits: ["close", "confirm"],
});
