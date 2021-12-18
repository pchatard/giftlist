<template>
	<div>
		<Subtitle>Informations de la liste</Subtitle>
		<div class="grid grid-cols-3 gap-4">
			<FormInputText
				:value="text"
				label="Label"
				@change="(value) => (text = value)"
				helperText="Some helper text"
				:isError="text === 'error'"
				errorMessage="Error"
				copy
				class="col-span-2"
			/>
			<FormInputText
				:value="text"
				label="Label Error"
				@change="(value) => (text = value)"
				helperText="Some helper text"
				isError
				errorMessage="Error message"
			/>
			<FormInputNumber
				:value="number"
				label="Label"
				@change="(value) => (number = value)"
				helperText="Some helper text"
				:isError="number === 666"
				errorMessage="Error"
				copy
			/>
			<FormInputNumber
				:value="number"
				label="Label Error"
				@change="(value) => (number = value)"
				helperText="Some helper text"
				isError
				errorMessage="Error message"
			/>
			<div class="flex items-center justify-between">
				<FormInputToggle
					:value="check"
					@change="(newCheck) => (check = newCheck)"
					label="Toggle"
					helperText="Helper text"
				/>
				<FormInputToggle
					:value="check"
					@change="(newCheck) => (check = newCheck)"
					label="Inline Toggle"
					helperText="Helper text"
					inline
				/>
			</div>
			<FormInputLink
				:value="url"
				label="Label"
				@change="(value) => (url = value)"
				helperText="Some helper text"
				:isError="urlError"
				errorMessage="Lien invalide"
				copy
				class="col-span-full"
			/>
			<FormSelect
				:value="selectValue"
				:options="selectOptions"
				label="Select Example"
				@change="(value) => (selectValue = value)"
			/>
			<FormSelect
				:value="selectValue"
				:options="selectOptions"
				label="Select Example"
				@change="(value) => (selectValue = value)"
				writable
			/>
			<div></div>
			<FormInputLink
				:value="url"
				label="Label Error"
				@change="(value) => (url = value)"
				helperText="Some helper text"
				isError
				errorMessage="Error message"
				class="col-span-full"
			/>
		</div>
		<button @click="$emit('confirm')" class="text-indigo-600 my-4">
			Continuer vers ma liste
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import Subtitle from "@/components/Styled/Subtitle.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";
import FormInputLink from "@/components/Inputs/FormInputLink.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import FormSelect from "@/components/Inputs/FormSelect.vue";

export default defineComponent({
	name: "NewListStep1",
	components: {
		FormInputText,
		FormInputNumber,
		FormInputLink,
		FormInputToggle,
		FormSelect,
		Subtitle,
	},
	setup() {
		const text = ref("Text");
		const number = ref(10);
		const url = ref("https://www.google.fr");
		const urlError = ref(false);
		const check = ref(false);

		const selectOptions = [
			{ id: 0, name: "Zero" },
			{ id: 1, name: "One" },
			{ id: 2, name: "Two" },
			{ id: 3, name: "Three" },
		];
		const selectValue = ref(selectOptions[2]);

		watch(url, (value: string) => {
			const urlRegex =
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
			urlError.value = !value.match(urlRegex);
		});

		return {
			text,
			number,
			url,
			urlError,
			check,
			selectOptions,
			selectValue,
		};
	},
	emits: ["confirm"],
});
</script>
