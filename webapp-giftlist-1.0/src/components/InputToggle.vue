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

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default defineComponent({
	name: "InputToggle",
	components: {
		SwitchGroup,
		Switch,
		SwitchLabel,
	},
	props: {
		value: {
			type: Boolean,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		helperText: {
			type: String,
		},
		inline: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const refValue = ref(props.value);

		watch(refValue, (value: boolean) => {
			context.emit("change", value);
		});

		return {
			refValue,
		};
	},
	emits: ["change"],
});
</script>
