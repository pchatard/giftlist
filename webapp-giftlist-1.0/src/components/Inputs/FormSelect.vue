<template>
	<fieldset>
		<Listbox v-model="selectedOption" v-slot="{ open }">
			<ListboxLabel>{{ label }}</ListboxLabel>
			<div class="relative mt-1">
				<ListboxButton
					class="
						relative
						w-full
						text-left
						bg-white
						rounded-lg
						shadow-md
						cursor-default
						focus:outline-none
						focus-visible:ring-2
						focus-visible:ring-opacity-75
						focus-visible:ring-white
						focus-visible:ring-offset-indigo-300
						focus-visible:ring-offset-2
						focus-visible:border-indigo-500
						sm:text-sm
					"
					:class="writable ? '' : 'py-2 pl-3 pr-10'"
				>
					<div
						v-if="writable"
						class="input-container flex items-stretch overflow-hidden rounded-md w-full"
					>
						<input
							type="text"
							v-model="inputSelect"
							@click.stop="() => (openWithInput = true)"
							@input.stop="openOrHideOptions"
							class="outline-none px-3 py-2 flex-1"
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
							class="
								absolute
								z-10
								w-full
								py-1
								mt-1
								overflow-auto
								text-base
								bg-white
								rounded-md
								shadow-lg
								max-h-60
								ring-1 ring-black ring-opacity-5
								focus:outline-none
								sm:text-sm
							"
							static
						>
							<ListboxOption
								v-slot="{ active, selected }"
								v-for="opt in filteredOptions"
								:key="opt.id"
								:value="opt"
								as="template"
							>
								<li
									class="
										cursor-pointer
										text-gray-900
										hover:text-indigo-600 hover:bg-indigo-100
									"
									:class="[
										active ? 'text-indigo-600 bg-indigo-100' : 'text-gray-900',
										'select-none relative py-2 pl-10 pr-4',
									]"
								>
									<span
										:class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
										>{{ opt.name }}</span
									>
									<span
										v-if="selected"
										class="
											absolute
											inset-y-0
											left-0
											flex
											items-center
											pl-3
											text-indigo-600
										"
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
	</fieldset>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import {
	Listbox,
	ListboxLabel,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue";
import { SelectorIcon, CheckIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "FormSelect",
	components: {
		Listbox,
		ListboxLabel,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		CheckIcon,
		SelectorIcon,
	},
	props: {
		value: {
			type: Object,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
		writable: {
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
		label: {
			type: String,
			required: true,
		},
		helperText: {
			type: String,
		},
	},
	setup(props, context) {
		const selectedOption = ref(props.value);
		const openWithInput = ref(false);
		const inputSelect = ref(props.value.name);
		const filteredOptions = ref(props.options);

		watch(selectedOption, (value) => {
			inputSelect.value = value.name;
			context.emit("change", value);
		});

		const openOrHideOptions = () => {
			openWithInput.value = inputSelect.value ? true : false;
			filterOptions(inputSelect.value);
		};

		const filterOptions = (queryFilter: string) => {
			if (!queryFilter) {
				filteredOptions.value = props.options;
				return;
			}
			filteredOptions.value = props.options.filter((opt: any) => {
				return opt.name.includes(queryFilter);
			});
		};

		onMounted(() => {
			window.addEventListener("click", (event) => {
				openWithInput.value = false;
			});
		});

		return {
			inputSelect,
			openOrHideOptions,
			openWithInput,
			selectedOption,
			filteredOptions,
		};
	},
	emits: ["change"],
});
</script>
