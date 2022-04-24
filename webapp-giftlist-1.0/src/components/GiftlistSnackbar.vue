<template>
	<transition name="snackbar">
		<div
			v-show="snack.show"
			:class="snack.type"
			class="fixed bottom-0 right-0 shadow-md rounded-md p-4 m-4"
		>
			<span> {{ snack.message }} </span>
			<button @click="hideSnackbar" class="ml-4 px-4 py-2 shadow-sm rounded-md">
				{{ labels.snackbar.close }}
			</button>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useStore } from "vuex";

import labels from "@/labels/fr/labels.json";
import { SnackbarState } from "@/store/snackbar";

export default defineComponent({
	name: "GiftlistSnackbar",
	props: {
		snack: {
			type: Object as PropType<SnackbarState>,
			required: true,
		},
	},
	setup() {
		const { dispatch } = useStore();

		const hideSnackbar = () => {
			dispatch("hideSnackbar");
		};

		return {
			labels,
			hideSnackbar,
		};
	},
});
</script>

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
