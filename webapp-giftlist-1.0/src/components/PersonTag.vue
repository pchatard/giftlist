<template>
	<span class="flex items-center justify-around bg-primary-light px-3 py-2 rounded-md">
		<span class="text-primary-default text-sm">
			{{ text }}
		</span>
		<XIcon
			v-if="!hideDelete"
			class="p-1 h-6 w-6 ml-2 hover:bg-primary-lightHover rounded-full text-primary-default cursor-pointer"
			@click="$emit('delete')"
		/>
	</span>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/outline";

interface Props {
	text: string;
	hideDelete?: boolean;
}

withDefaults(defineProps<Props>(), { hideDelete: false });

defineEmits<{
	(e: "delete"): void;
}>();
</script>
