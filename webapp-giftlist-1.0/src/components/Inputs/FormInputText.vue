<template>
	<FormWrapper
		:label="label"
		:isError="isError"
		:errorMessage="errorMessage"
		:helperText="helperText"
		:selected="selected"
		:copied="copied"
	>
		<input
			v-model="refValue"
			:type="type"
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
	</FormWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { ClipboardCopyIcon, ClipboardCheckIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
import FormWrapper from "@/components/Inputs/FormWrapper.vue";

export default defineComponent({
	name: "FormInputText",
	components: { ClipboardCopyIcon, ClipboardCheckIcon, TransitionRoot, FormWrapper },
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

		watch(props, (value) => {
			refValue.value = value.value;
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
		};
	},
	emits: ["change"],
});
</script>
