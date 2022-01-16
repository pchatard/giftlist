<template>
	<DefaultLayout title="Mes amis"> </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "Friends",
	components: { DefaultLayout },
});
</script>
