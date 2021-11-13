<template>
	<div class="max-w-7xl mx-auto">
		<Title class="mb-4">{{ title }}</Title>
		<div class="rounded-lg border border-yellow-400 min-h-layout h-full relative">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "DefaultLayout",
	components: { Title },
	props: {
		title: String,
	},
});
</script>
