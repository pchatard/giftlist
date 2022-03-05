<script src="./snackbar.ts"></script>
<template src="./snackbar.html"></template>

<style lang="scss">
.success {
	@apply bg-green-500 text-white;

	button:hover {
		@apply bg-green-600;
	}
}

.error {
	@apply bg-red-500 text-white;

	button:hover {
		@apply bg-red-600;
	}
}

.warning {
	@apply bg-yellow-500 text-white;

	button:hover {
		@apply bg-yellow-600;
	}
}

.info {
	@apply bg-white text-black;

	button:hover {
		@apply bg-gray-50;
	}
}

.snackbar-enter-active,
.snackbar-leave-active {
	transition: transform 0.5s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
	transform: translateX(100%);
}
</style>
