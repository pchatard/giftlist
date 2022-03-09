<script src="./navbar-item.ts"></script>
<template src="./navbar-item.html"></template>

<style lang="scss" scoped>
.giftlist-outline {
	@apply w-0 h-px mt-1 transition-all duration-500;
}

li:hover .giftlist-outline,
.router-link-exact-active + .giftlist-outline {
	@apply w-full bg-yellow-400;
}
</style>
