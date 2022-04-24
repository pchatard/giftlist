<template>
	<button
		class="rounded-md font-bold py-2 px-4 flex items-center justify-center text-sm"
		:class="{
			'bg-indigo-600 text-white hover:bg-indigo-700': btnStyle === 'primary',
			'bg-indigo-100 text-indigo-600 hover:bg-indigo-200': btnStyle === 'primary-soft',
			'border border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700':
				btnStyle === 'secondary',
			'bg-red-600 text-white hover:bg-red-700': btnStyle === 'danger',
			'bg-red-100 text-red-900 hover:bg-red-200': btnStyle === 'danger-soft',
			'bg-green-100 text-green-600 hover:bg-green-200': btnStyle === 'green-soft',
			'bg-gray-100 text-gray-900 hover:bg-gray-200': btnStyle === 'secondary-soft',
		}"
	>
		<div v-if="loading" class="flex items-center mt-1">
			<PulseLoader :loading="loading" size="10px" :color="spinnerColor" />
		</div>
		<div v-else class="flex flex-row items-center justify-center">
			<span :class="{ 'h-5 w-5': hasIcon }">
				<slot name="icon" />
			</span>
			<span :class="{ 'ml-2': hasIcon }">
				<slot />
			</span>
		</div>
	</button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { ButtonStyleEnum } from "@/types/ButtonStyleEnum";

export default defineComponent({
	name: "GiftlistButton",
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
</script>
