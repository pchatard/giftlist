<template>
	<div class="dashboard">
		<Title>Bienvenue</Title>
		<label for=""><input type="checkbox" name="" id="" />Test</label>
	</div>
</template>

<script lang="ts">
import Title from "@/components/Styled/Title.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: { Title },
	name: "Dashboard",
});
</script>
