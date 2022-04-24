<template>
	<li class="mx-2 text-md">
		<router-link :to="path" class="flex flex-row items-center justify-between">
			<slot />
			<span class="ml-2">
				{{ text }}
			</span>
		</router-link>
		<div v-if="outline" class="giftlist-outline"></div>
	</li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "GiftlistNavbarItem",
	props: {
		path: String,
		text: String,
		outline: Boolean,
	},
});
</script>

<style lang="scss" scoped>
.giftlist-outline {
	@apply w-0 h-px mt-1 transition-all duration-500;
}

li:hover .giftlist-outline,
.router-link-exact-active + .giftlist-outline {
	@apply w-full bg-yellow-400;
}
</style>
