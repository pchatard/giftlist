<template>
	<div>
		<Subtitle>Informations de la liste</Subtitle>
		<div class="flex flex-col gap-4">
			<div class="flex justify-start gap-4">
				<FormInputText
					:value="text"
					label="Label"
					@change="(value) => (text = value)"
					helperText="Some helper text"
					:isError="text === 'error'"
					errorMessage="Error"
					copy
					class="w-full"
				/>
				<FormInputText
					:value="text"
					label="Label Error"
					@change="(value) => (text = value)"
					helperText="Some helper text"
					isError
					errorMessage="Error message"
				/>
			</div>
			<div class="flex justify-start gap-4">
				<FormInputNumber
					:value="number"
					label="Label"
					@change="(value) => (number = value)"
					helperText="Some helper text"
					:isError="number === 666"
					errorMessage="Error"
					copy
					class="w-full"
				/>
				<FormInputNumber
					:value="number"
					label="Label Error"
					@change="(value) => (number = value)"
					helperText="Some helper text"
					isError
					errorMessage="Error message"
				/>
			</div>
			<div class="flex justify-start gap-4">
				<FormInputLink
					:value="url"
					label="Label"
					@change="(value) => (url = value)"
					helperText="Some helper text"
					:isError="urlError"
					errorMessage="Lien invalide"
					copy
					class="w-full"
				/>
				<FormInputLink
					:value="url"
					label="Label Error"
					@change="(value) => (url = value)"
					helperText="Some helper text"
					isError
					errorMessage="Error message"
				/>
			</div>
			<FormInputToggle :value="check" label="Toggle" helperText="Helper text" />
		</div>
		<button @click="$emit('confirm')">Continuer vers ma liste</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import Subtitle from "@/components/Styled/Subtitle.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";
import FormInputLink from "@/components/Inputs/FormInputLink.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";

export default defineComponent({
	name: "NewListStep1",
	components: {
		FormInputText,
		FormInputNumber,
		FormInputLink,
		FormInputToggle,
		Subtitle,
	},
	setup() {
		const text = ref("Text");
		const number = ref(10);
		const url = ref("https://www.google.fr");
		const urlError = ref(false);
		const check = ref(false);

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
		};
	},
	emits: ["confirm"],
});
</script>
