<template>
	<td class="px-4 py-4 whitespace-nowrap">
		<span v-if="content">{{ content }}</span>
		<slot v-else />
	</td>
</template>

<script setup lang="ts">
interface Props {
	content?: string;
}

defineProps<Props>();
</script>
