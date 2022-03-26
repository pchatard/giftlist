import { computed, defineComponent, PropType } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { ButtonStyleEnum } from "@/types/ButtonStyleEnum";

export default defineComponent({
	name: "Button",
	components: { PulseLoader },
	props: {
		hasIcon: {
			type: Boolean,
			required: false,
			default: false,
		},
		btnStyle: {
			type: String as PropType<ButtonStyleEnum>,
			default: ButtonStyleEnum.primary,
			required: false,
		},
		loading: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup(props) {
		const spinnerColor = computed(() => {
			switch (props.btnStyle) {
				case ButtonStyleEnum.danger:
					return "#FFFFFF";
				case ButtonStyleEnum.dangerSoft:
					return "#DC2626";
				case ButtonStyleEnum.greenSoft:
					return "#16a34a";
				case ButtonStyleEnum.primary:
					return "#FFFFFF";
				case ButtonStyleEnum.primarySoft:
					return "#4F46E5";
				case ButtonStyleEnum.secondary:
					return "#4F46E5";
				case ButtonStyleEnum.secondarySoft:
					return "#000000";
				default:
					return "#FFFFFF";
			}
		});

		return {
			spinnerColor,
		};
	},
});
