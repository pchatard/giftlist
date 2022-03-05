import { computed, defineComponent } from 'vue';

import Button from '@/components/Button/Button.vue';
import InputLink from '@/components/InputLink/InputLink.vue';
import InputNumber from '@/components/InputNumber/InputNumber.vue';
import InputSelect from '@/components/InputSelect/InputSelect.vue';
import InputText from '@/components/InputText/InputText.vue';
import InputToggle from '@/components/InputToggle/InputToggle.vue';
import labels from '@/labels/fr/labels.json';
import { CheckIcon, XIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "GiftForm",
	components: {
		InputText,
		InputToggle,
		InputNumber,
		InputLink,
		InputSelect,
		Button,
		XIcon,
		CheckIcon,
	},
	props: {
		values: {
			type: Object,
			required: true,
		},
		action: {
			type: String,
			default: "create",
		},
	},
	setup(props, context) {
		const handleChange = (field: string, value: any) => {
			let fieldContent = { ...props.values[field], value };
			if (!["isFavorite", "showDetails"].includes(field)) {
				fieldContent.errorMessage = "";
			}

			const values = {
				...props.values,
				[field]: fieldContent,
			};
			context.emit("change", values);
		};

		const confirmText = computed(() => {
			if (props.action === "create") {
				return labels.gift.buttons.create;
			}

			return labels.gift.buttons.save;
		});

		return {
			labels,
			confirmText,
			handleChange,
		};
	},
	emits: ["change", "cancel", "confirm"],
});
