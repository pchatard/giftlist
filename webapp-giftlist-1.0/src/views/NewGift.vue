<template>
	<DefaultLayout title="Nouveau cadeau"></DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "NewGift",
	components: {
		DefaultLayout,
	},
});
</script>
