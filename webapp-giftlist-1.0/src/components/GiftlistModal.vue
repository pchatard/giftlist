<template>
	<TransitionRoot appear :show="show" as="template">
		<Dialog as="div" @close="$emit('close')">
			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="min-h-screen px-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<DialogOverlay class="fixed inset-0 bg-black bg-opacity-50" />
					</TransitionChild>

					<span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<div
							class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								{{ title }}
							</DialogTitle>
							<div class="mt-2">
								<slot />
							</div>

							<div class="mt-4 flex gap-2 justify-end">
								<GiftlistButton
									v-show="cancelText"
									btn-style="secondary-soft"
									@click="$emit('close')"
								>
									{{ cancelText }}
								</GiftlistButton>
								<GiftlistButton
									v-if="confirmText"
									:btn-style="type === 'danger' ? 'danger-soft' : 'primary-soft'"
									:loading="btnLoading"
									@click="$emit('confirm')"
								>
									{{ confirmText }}
								</GiftlistButton>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { ModalTypeEnum } from "@/types/enums/ModalTypeEnum";

import GiftlistButton from "@/components/GiftlistButton.vue";
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";

interface Props {
	show: boolean;
	title: string;
	type?: ModalTypeEnum;
	btnLoading?: boolean;
	confirmText?: string;
	cancelText?: string;
}

withDefaults(defineProps<Props>(), {
	type: ModalTypeEnum.NORMAL,
	btnLoading: false,
	confirmText: "",
	cancelText: "",
});

defineEmits<{
	(e: "close"): void;
	(e: "confirm"): void;
}>();
</script>
