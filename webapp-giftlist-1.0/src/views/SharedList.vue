<template>
	<DefaultLayout title="La liste de mon copain"></DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
	},
});
</script>
