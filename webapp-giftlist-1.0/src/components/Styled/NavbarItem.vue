<template>
	<li :class="{ 'giftlist-cta': isCTA }" class="mx-2">
		<router-link :to="path">{{ text }}</router-link>
		<div class="giftlist-outline"></div>
	</li>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, toRefs } from "vue";

export default defineComponent({
	name: "NavbarItem",
	props: {
		isCTA: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		path: String,
		text: String,
	},
});
</script>

<style lang="scss" scoped>
.giftlist-outline {
	@apply w-0 h-px transition-all duration-500;
}

li:hover .giftlist-outline,
.router-link-exact-active + .giftlist-outline {
	@apply w-full bg-yellow-400;
}
</style>