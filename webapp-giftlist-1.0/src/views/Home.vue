<template>
	<div class="home">
		<Title>Home</Title>
	</div>
</template>

<script lang="ts">
import Title from "@/components/Styled/Title.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Home",
	components: { Title },
});
</script>
