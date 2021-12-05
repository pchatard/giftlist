<template>
	<button
		class="rounded-md font-bold py-2 px-4 flex flex-row items-center justify-center text-sm"
		:class="{
			'bg-indigo-600 text-white hover:bg-indigo-700': btnStyle === 'primary',
			'border border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700':
				btnStyle === 'secondary',
			'bg-red-600 text-white hover:bg-red-700': btnStyle === 'danger',
		}"
	>
		<span :class="{ 'h-5 w-5': hasIcon }">
			<slot name="icon" />
		</span>
		<span :class="{ 'ml-2': hasIcon }">
			<slot />
		</span>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ButtonStyleEnum } from "@/types/ButtonStyleEnum";

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
</script>
