<template>
	<div class="max-w-7xl mx-auto">
		<div class="flex items-center justify-between">
			<Title class="mb-4">{{ title }}</Title>
			<div class="flex items-center">
				<slot name="commands" />
			</div>
		</div>
		<div class="rounded-lg min-h-layout h-full relative">
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
