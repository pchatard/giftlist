<template>
	<DefaultLayout title="Bienvenue"> </DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: { DefaultLayout },
	name: "Dashboard",
});
</script>
