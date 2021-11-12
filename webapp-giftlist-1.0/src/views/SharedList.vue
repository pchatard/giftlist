<template>
	<div class="shared-list">
		<Title>La liste de mon copain</Title>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "SharedList",
	components: {
		Title,
	},
});
</script>
