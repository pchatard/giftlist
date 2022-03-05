<script src="./navbar-logged-in.ts"></script>
<template src="./navbar-logged-in.html"></template>

<style lang="scss" scoped>
.giftlist-navbar-item {
	.giftlist-navbar-item-icon {
		@apply transition-all duration-200;
	}

	&:hover {
		.giftlist-navbar-item-icon {
			@apply text-yellow-400;
		}
	}
}
</style>
