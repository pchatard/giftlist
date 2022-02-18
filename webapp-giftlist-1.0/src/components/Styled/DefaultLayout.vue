<template>
	<div class="max-w-7xl mx-auto">
		<div class="flex items-center justify-between">
			<div class="flex flex-col gap-2">
				<div
					v-if="back"
					class="flex gap-2 text-gray-600 cursor-pointer hover:text-black"
					@click="handleBackButtonClick"
				>
					<ArrowLeftIcon class="w-4" />
					<span>{{ backText }}</span>
				</div>
				<Title class="mb-4">{{ title }}</Title>
			</div>
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
import { computed, defineComponent } from "vue";
import Title from "@/components/Styled/Title.vue";

import labels from "@/labels/fr/labels.json";

import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "DefaultLayout",
	components: { Title, ArrowLeftIcon },
	props: {
		title: String,
		back: Boolean,
		backButtonTitle: {
			type: String,
			required: false,
		},
		backButtonLink: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const router = useRouter();

		const backText = computed(() => {
			const back = labels.defaultLayout.back;
			if (props.backButtonTitle) {
				return `${back} vers ${props.backButtonTitle}`;
			}
			return back;
		});

		const handleBackButtonClick = () => {
			if (props.backButtonLink) {
				router.push(props.backButtonLink);
			} else {
				router.go(-1);
			}
		};

		return {
			backText,
			handleBackButtonClick,
		};
	},
});
</script>
