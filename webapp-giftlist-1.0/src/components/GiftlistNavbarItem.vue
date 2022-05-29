<template>
	<li class="mx-2 text-md">
		<router-link :to="path" class="flex flex-row items-center justify-between">
			<slot />
			<span class="ml-2">
				{{ text }}
			</span>
		</router-link>
		<div v-if="outline" class="giftlist-outline w-0 h-px mt-1 transition-all duration-500"></div>
	</li>
</template>

<script setup lang="ts">
interface Props {
	path: string;
	text: string;
	outline: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
li:hover .giftlist-outline,
.router-link-exact-active + .giftlist-outline {
	@apply w-full bg-logo;
}
</style>
