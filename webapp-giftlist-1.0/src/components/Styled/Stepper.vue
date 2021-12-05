<template>
	<div class="flex items-center justify-center">
		<div v-for="i in maxSteps" :key="i" class="flex items-center">
			<span
				class="mx-2 w-8 h-8 rounded-full grid place-items-center"
				:class="
					i <= step
						? 'bg-indigo-600 text-white'
						: 'text-indigo-600 bg-white border border-indigo-600'
				"
			>
				{{ i }}
			</span>
			<span
				v-if="i < maxSteps"
				class="w-20 mx-2 border"
				:class="i < step ? 'border-indigo-600' : ''"
			></span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Stepper",
	props: {
		step: {
			type: Number,
			required: true,
		},
		maxSteps: {
			type: Number,
			required: true,
		},
	},
});
</script>
