<template>
	<ErrorLayout back>
		<div
			class="absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center gap-4"
		>
			<ExclamationIcon class="w-1/6 text-red-800" />
			<div>Une erreur est survenue...</div>
			<Button btn-style="danger-soft" @click="router.go(-1)">Retour</Button>
		</div>
	</ErrorLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "@/components/Button/Button.vue";
import ErrorLayout from "@/components/DefaultLayout.vue";
import router from "@/router";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ErrorView",
	components: {
		ErrorLayout,
		ExclamationIcon,
		Button,
	},
	setup() {
		return {
			router,
		};
	},
});
</script>
