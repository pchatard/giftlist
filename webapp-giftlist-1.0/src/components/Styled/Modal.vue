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
							class="
								inline-block
								w-full
								max-w-md
								p-6
								my-8
								overflow-hidden
								text-left
								align-middle
								transition-all
								transform
								bg-white
								shadow-xl
								rounded-2xl
							"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								{{ title }}
							</DialogTitle>
							<div class="mt-2">
								<slot />
							</div>

							<div class="mt-4 flex justify-end">
								<button
									type="button"
									v-show="cancelText"
									class="
										inline-flex
										justify-center
										px-4
										py-2
										mr-2
										text-sm
										font-medium
										text-gray-900
										bg-gray-100
										border border-transparent
										rounded-md
										hover:bg-gray-200
										focus:outline-none
										focus-visible:ring-2
										focus-visible:ring-offset-2
										focus-visible:ring-gray-500
									"
									@click="$emit('close')"
								>
									{{ cancelText }}
								</button>
								<button
									type="button"
									class="
										inline-flex
										justify-center
										px-4
										py-2
										text-sm
										font-medium
										border border-transparent
										rounded-md
										focus:outline-none
										focus-visible:ring-2 focus-visible:ring-offset-2
									"
									:class="
										type === 'danger'
											? 'text-red-900 bg-red-100 hover:bg-red-200 focus-visible:ring-red-500'
											: 'text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500'
									"
									@click="$emit('confirm')"
								>
									{{ confirmText }}
								</button>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ModalTypeEnum } from "@/types/ModalTypeEnum";

import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
	DialogTitle,
} from "@headlessui/vue";

export default defineComponent({
	name: "Modal",
	components: {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	},
	props: {
		type: {
			type: String as PropType<ModalTypeEnum>,
			default: ModalTypeEnum.NORMAL,
		},
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		confirmText: {
			type: String,
			required: true,
		},
		cancelText: {
			type: String,
			required: false,
			default: "Annuler",
		},
	},
	emits: ["close", "confirm"],
});
</script>
