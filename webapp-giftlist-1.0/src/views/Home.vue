<template>
	<DefaultLayout title="Home"></DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Home",
	components: { DefaultLayout },
});
</script>
