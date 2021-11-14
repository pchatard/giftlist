<template>
	<button
		class="rounded-md font-bold py-2 px-4 flex flex-row items-center justify-center"
		:class="{
			'bg-indigo-600 text-white': btnStyle === 'primary',
			'border border-indigo-600 text-indigo-600': btnStyle === 'secondary',
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
