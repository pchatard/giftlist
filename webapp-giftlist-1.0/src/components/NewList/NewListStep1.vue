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
		</div>
		<button @click="$emit('confirm')">Continuer vers ma liste</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Subtitle from "@/components/Styled/Subtitle.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";

export default defineComponent({
	name: "NewListStep1",
	components: {
		FormInputText,
		FormInputNumber,
		Subtitle,
	},
	setup() {
		const text = ref("Text");
		const number = ref(10);

		return {
			text,
			number,
		};
	},
	emits: ["confirm"],
});
</script>
