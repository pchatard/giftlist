<template>
	<div class="flex flex-col items-center justify-between gap-y-2 w-1/3 mx-auto">
		<div class="w-full flex justify-between">
			<span
				v-for="i in maxSteps"
				:key="i"
				class="
					mx-2
					w-8
					h-8
					rounded-full
					grid
					place-items-center
					transition-all
					duration-200
					cursor-pointer
				"
				:class="
					i <= step
						? 'bg-indigo-600 text-white hover:bg-indigo-500'
						: 'text-indigo-600 bg-white border border-indigo-600'
				"
				@click="handleStepperClick(i)"
			>
				{{ i }}
			</span>
		</div>

		<span
			class="
				h-1
				rounded-full
				self-stretch
				flex
				items-stretch
				justify-start
				overflow-hidden
				mx-4
				relative
			"
		>
			<span
				class="
					absolute
					w-full
					h-full
					transform
					right-full
					bg-indigo-600
					transition-all
					duration-500
				"
				:class="stepperWidth"
			></span>
		</span>
		<Subtitle class="text-gray-700">{{ title }}</Subtitle>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "Stepper",
	components: {
		Subtitle,
	},
	props: {
		step: {
			type: Number,
			required: true,
		},
		maxSteps: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	setup(props, context) {
		const handleStepperClick = (clickedStep: number) => {
			context.emit("changeStep", clickedStep);
		};

		const stepperWidth = computed(() => {
			switch (props.step) {
				case 1:
					return "translate-x-2";
				case 2:
					return "translate-x-1/2";
				case 3:
					return "translate-x-full";
				default:
					return "";
			}
		});

		return {
			handleStepperClick,
			stepperWidth,
		};
	},
	emits: ["changeStep"],
});
</script>
