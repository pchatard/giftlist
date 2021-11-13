<template>
	<default-layout title="Mon compte"></default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "Profile",
	components: { DefaultLayout },
});
</script>
