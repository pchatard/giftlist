<template>
	<fieldset class="flex flex-col items-start transition-all">
		<label class="text-sm font-semibold transition-all" :class="computedLabelClass">
			{{ label }}
		</label>
		<div
			class="input-container flex items-stretch overflow-hidden border rounded-md my-1 w-full"
			:class="computedInputBorderClass"
		>
			<input
				v-model="refValue"
				type="url"
				:disabled="disabled"
				:placeholder="placeholder"
				class="outline-none px-3 py-2 flex-1"
				@focus="onFocus"
				@blur="onBlur"
			/>
			<button
				v-if="copy"
				@click="copyToClipboard"
				class="relative w-8 border-l border-gray-100 hover:bg-gray-100"
			>
				<TransitionRoot
					:show="!copied"
					enter="transition-opacity duration-500  delay-200"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity duration-100"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<ClipboardCopyIcon
						class="
							absolute
							w-5
							top-1/2
							left-1/2
							transform
							-translate-x-1/2 -translate-y-1/2
							text-indigo-600
						"
					/>
				</TransitionRoot>
				<TransitionRoot
					:show="copied"
					enter="transition-opacity duration-500 delay-200"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity duration-100"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<ClipboardCheckIcon
						class="
							absolute
							w-5
							top-1/2
							left-1/2
							transform
							-translate-x-1/2 -translate-y-1/2
							text-green-500
						"
					/>
				</TransitionRoot>
			</button>
		</div>
		<span class="input-helper text-xs text-gray-500" :class="{ 'text-red-600': isError }">
			{{ computedHelperText }}
		</span>
	</fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { ClipboardCopyIcon, ClipboardCheckIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";

export default defineComponent({
	name: "FormInputLink",
	components: { ClipboardCopyIcon, ClipboardCheckIcon, TransitionRoot },
	props: {
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: "text",
			validator: (value: string) => {
				return ["text", "email", "password"].includes(value.toLowerCase());
			},
		},
		placeholder: {
			type: String,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
		},
		helperText: {
			type: String,
		},
		copy: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const refValue = ref(props.value);
		const selected = ref(false);
		const copied = ref(false);

		const computedHelperText = computed(() => {
			if (props.isError) {
				return props.errorMessage;
			}
			if (selected.value) {
				return props.helperText;
			}
			return "\xa0";
		});

		const computedInputBorderClass = computed(() => {
			if (props.isError) {
				return "border-red-600";
			}
			if (selected.value) {
				return "border-indigo-600";
			}
			return "border-gray-300 hover:border-indigo-600";
		});

		const computedLabelClass = computed(() => {
			if (props.isError) {
				return "text-red-600";
			}
			if (selected.value) {
				return "text-indigo-600";
			}
			return "text-gray-600";
		});

		const copyToClipboard = (event: Event) => {
			const button = event.currentTarget as HTMLElement;
			const input = button.previousElementSibling as HTMLInputElement;
			input.select();
			document.execCommand("copy");
			copied.value = true;
		};

		watch(refValue, (value) => {
			context.emit("change", value);
			copied.value = false;
		});

		const onFocus = () => {
			selected.value = true;
		};
		const onBlur = () => {
			selected.value = false;
		};

		return {
			copied,
			copyToClipboard,
			refValue,
			onFocus,
			onBlur,
			selected,
			computedLabelClass,
			computedHelperText,
			computedInputBorderClass,
		};
	},
	emits: ["change"],
});
</script>
