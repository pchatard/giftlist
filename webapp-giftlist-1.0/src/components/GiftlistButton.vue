<template>
	<button
		class="rounded-md font-bold py-2 px-4 flex items-center justify-center text-sm"
		:class="{
			'bg-primary-default text-white hover:bg-primary-hover': btnStyle === 'primary',
			'bg-primary-light text-primary-default hover:bg-primary-lightHover':
				btnStyle === 'primary-soft',
			'border border-primary-default text-primary-default hover:border-primary-hover hover:text-primary-hover':
				btnStyle === 'secondary',
			'bg-danger-default text-white hover:bg-danger-hover': btnStyle === 'danger',
			'bg-danger-light text-danger-text hover:bg-danger-lightHover': btnStyle === 'danger-soft',
			'bg-success-light text-success-default hover:bg-success-lightHover':
				btnStyle === 'green-soft',
			'bg-secondary-default text-gray-900 hover:bg-secondary-hover':
				btnStyle === 'secondary-soft',
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

<script setup lang="ts">
import { computed } from "vue";

import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";

interface Props {
	btnStyle?: ButtonStyleEnum;
	hasIcon?: boolean;
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	btnStyle: ButtonStyleEnum.primary,
	hasIcon: false,
	loading: false,
});

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
</script>
