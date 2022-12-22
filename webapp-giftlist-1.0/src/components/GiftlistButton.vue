<template>
	<button class="rounded-md font-bold py-2 px-4 flex itens-center text-sm max-w-md" :class="buttonStyle">
		<RefreshIcon v-if="loading" class="w-5 animate-[spin_1s_reverse_infinite]" />
		<span v-if="hasIcon && !loading" class="w-5">
			<slot name="icon" />
		</span>
		<span class="flex-1 flex items-center justify-center">
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";

import { RefreshIcon } from "@heroicons/vue/outline";

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

const buttonStyle = computed(() => {
	switch (props.btnStyle) {
		case ButtonStyleEnum.primary:
			return "bg-primary-default text-white hover:bg-primary-hover";
		case ButtonStyleEnum.primarySoft:
			return "bg-primary-light text-primary-text hover:bg-primary-lightHover";
		case ButtonStyleEnum.secondary:
			return "bg-secondary-default text-secondary-text hover:bg-secondary-hover";
		case ButtonStyleEnum.secondarySoft:
			return "bg-secondary-light text-secondary-text shadow-md hover:bg-secondary-lightHover";
		case ButtonStyleEnum.danger:
			return "bg-danger-default text-white hover:bg-danger-hover";
		case ButtonStyleEnum.dangerSoft:
			return "bg-danger-light text-danger-text hover:bg-danger-lightHover";
		case ButtonStyleEnum.success:
			return "bg-success-default text-white hover:bg-success-hover";
		case ButtonStyleEnum.successSoft:
			return "bg-success-light text-success-text hover:bg-success-lightHover";
		default:
			return "";
	}
});

const spinnerColor = computed(() => {
	switch (props.btnStyle) {
		case ButtonStyleEnum.danger:
			return "#FFFFFF";
		case ButtonStyleEnum.dangerSoft:
			return "#DC2626";
		case ButtonStyleEnum.successSoft:
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
