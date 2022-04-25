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
			</div>
		</div>
		<div class="rounded-lg min-h-layout h-full relative">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import labels from "@/labels/fr/labels.json";

import Title from "@/components/GiftlistTitle.vue";

import { ArrowLeftIcon } from "@heroicons/vue/outline";

interface Props {
	back: boolean;
	backButtonTitle?: string;
	backButtonLink?: string;
}

const props = defineProps<Props>();

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
</script>
