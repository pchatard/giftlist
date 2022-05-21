<template>
	<transition name="snackbar">
		<div
			v-show="snack.show"
			:class="snack.type"
			class="fixed bottom-0 right-0 shadow-md rounded-md p-4 m-4"
		>
			<span> {{ snack.message }} </span>
			<button class="ml-4 px-4 py-2 shadow-sm rounded-md" @click="hideSnackbar">
				{{ labels.snackbar.close }}
			</button>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";

import { SnackbarState } from "@/store/snackbar";

interface Props {
	snack: SnackbarState;
}

defineProps<Props>();

const { dispatch } = useStore();

const hideSnackbar = () => {
	dispatch("hideSnackbar");
};
</script>

<style lang="scss">
.success {
	@apply bg-green-500 text-white;

	button:hover {
		@apply bg-success-default;
	}
}

.error {
	@apply bg-red-500 text-white;

	button:hover {
		@apply bg-danger-default;
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
