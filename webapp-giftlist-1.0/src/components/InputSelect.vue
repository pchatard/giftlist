<template>
	<fieldset class="flex items-center">
		<slot />
		<div class="self-baseline flex-1">
			<Listbox v-slot="{ open }" v-model="selectedOption">
				<ListboxLabel>{{ label }}</ListboxLabel>
				<div class="relative mt-1">
					<ListboxButton
						class="relative w-full text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border border-indigo-400"
						:class="writable ? '' : 'py-2 pl-3 pr-10'"
					>
						<div
							v-if="writable"
							class="input-container flex items-stretch overflow-hidden rounded-md w-full"
						>
							<input
								v-model="inputSelect"
								type="text"
								class="outline-none px-3 py-2 flex-1"
								@click.stop="() => (openWithInput = true)"
								@input.stop="openOrHideOptions"
							/>
							<span
								class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
							>
								<SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
							</span>
						</div>
						<div v-else>
							<span class="block truncate">{{ selectedOption.name }}</span>
							<span
								class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
							>
								<SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
							</span>
						</div>
					</ListboxButton>

					<transition
						leave-active-class="transition duration-100 ease-in"
						leave-from-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<div v-show="writable ? openWithInput : open">
							<ListboxOptions
								class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
								static
							>
								<ListboxOption v-if="!filteredOptions.length" as="template">
									<li
										class="cursor-pointer text-gray-900 hover:bg-secondary-default select-none relative py-2 pl-10 pr-4"
									>
										<span class="font-normal block truncate"
											>Aucune option disponible</span
										>
									</li>
								</ListboxOption>
								<ListboxOption
									v-for="opt in filteredOptions"
									v-slot="{ active, selected }"
									:key="(opt.id as string)"
									:value="opt"
									as="template"
								>
									<li
										class="cursor-pointer text-gray-900 hover:text-primary-default hover:bg-primary-light"
										:class="[
											active ? 'text-primary-default bg-primary-light' : 'text-gray-900',
											'select-none relative py-2 pl-10 pr-4',
										]"
									>
										<span
											:class="[
												selected ? 'font-medium' : 'font-normal',
												'block truncate',
											]"
											>{{ opt.name }}</span
										>
										<span
											v-if="selected"
											class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-default"
										>
											<CheckIcon class="w-5 h-5" aria-hidden="true" />
										</span>
									</li>
								</ListboxOption>
							</ListboxOptions>
						</div>
					</transition>
				</div>
			</Listbox>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import {
	Listbox,
	ListboxButton,
	ListboxLabel,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/outline";

interface Props {
	value: Record<string, unknown>;
	label: string;
	options: Record<string, unknown>[];
	isError?: boolean;
	errorMessage?: string;
	helperText?: string;
	writable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	isError: false,
	writable: false,
	errorMessage: "",
	helperText: "",
});

const emit = defineEmits<{
	(e: "change", value: Record<string, unknown>): void;
}>();

const selectedOption = ref(props.value);
const openWithInput = ref(false);
const inputSelect = ref(props.value.name);
const filteredOptions = ref(props.options);

watch(selectedOption, (value) => {
	if (selectedOption.value.id) {
		inputSelect.value = value.name;
		emit("change", value);
	}
});

watch(props, (value) => {
	filteredOptions.value = value.options;
	inputSelect.value = "";
	selectedOption.value = value.value;
});

const filterOptions = (queryFilter: string) => {
	if (!queryFilter) {
		filteredOptions.value = props.options;
		return;
	}
	filteredOptions.value = props.options.filter((opt) => {
		return opt.name.includes(queryFilter);
	});
};

const openOrHideOptions = () => {
	openWithInput.value = inputSelect.value ? true : false;
	filterOptions(inputSelect.value);
};

onMounted(() => {
	window.addEventListener("click", () => {
		openWithInput.value = false;
	});
});
</script>
