<template>
	<DefaultLayout title="Mes cadeaux réservés"></DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "BookedGifts",
	components: {
		DefaultLayout,
	},
});
</script>
