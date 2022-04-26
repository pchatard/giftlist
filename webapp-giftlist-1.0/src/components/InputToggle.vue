<template>
	<fieldset class="flex items-center">
		<slot />
		<div>
			<SwitchGroup>
				<div class="flex" :class="inline ? 'items-baseline' : 'flex-col'">
					<div :class="inline ? 'flex items-center' : 'flex flex-col'">
						<SwitchLabel>{{ label }}</SwitchLabel>
						<Switch
							v-model="refValue"
							:class="{
								'bg-indigo-600 hover:bg-indigo-600': refValue,
								'bg-gray-200': !refValue,
								'ml-4': inline,
							}"
							class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 my-1 focus:outline-none hover:bg-gray-300"
						>
							<span
								:class="refValue ? 'translate-x-6' : 'translate-x-1'"
								class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
							/>
						</Switch>
					</div>
				</div>
				<span class="input-helper text-xs text-gray-500">{{ helperText || "&nbsp;" }}</span>
			</SwitchGroup>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

interface Props {
	value: boolean;
	label: string;
	disabled?: boolean;
	helperText?: string;
	inline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	inline: false,
	helperText: "",
});

const emit = defineEmits<{
	(e: "change", value: boolean): void;
}>();

const refValue = ref(props.value);

watch(refValue, (value: boolean) => {
	emit("change", value);
});
</script>
