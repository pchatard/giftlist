import { defineComponent, PropType } from 'vue';

import { ButtonStyleEnum } from '@/types/ButtonStyleEnum';

export default defineComponent({
	name: "Button",
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
	},
});
