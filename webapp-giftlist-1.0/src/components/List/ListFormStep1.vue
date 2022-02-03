<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<FormInputText
				class="col-span-1"
				:label="values.title.label"
				:value="values.title.value"
				@change="handleTitleChange"
				:helperText="values.title.helperText"
				:placeholder="values.title.placeholder"
				:isError="values.title.errorMessage !== ''"
				:errorMessage="values.title.errorMessage"
				:mandatory="values.title.required"
				reset
			/>
			<FormInputText
				class="col-span-3 pt-4"
				:label="values.description.label"
				:value="values.description.value"
				:helperText="values.description.helperText"
				:placeholder="values.description.placeholder"
				:isError="values.description.errorMessage !== ''"
				:errorMessage="values.description.errorMessage"
				:mandatory="values.description.required"
				reset
				@change="handleDescriptionChange"
			/>
		</div>

		<div class="col-span-full grid grid-rows-2 grid-cols-3 pt-4">
			<FormInputToggle
				class="col-span-full"
				label="Ajouter une date d'échéance ?"
				:value="values.activateTermDate"
				@change="handleActivateTermDateChange"
				inline
				helperText="Grâce à la date d'échéance, vos amis pourront juger de l'imminence de votre évènement."
			/>
			<FormDatePicker
				v-show="values.activateTermDate"
				:disabled="!values.activateTermDate"
				class="col-span-1 w-auto"
				:label="values.termDate.label"
				:value="values.termDate.value"
				:helperText="values.termDate.helperText"
				:isError="values.termDate.errorMessage !== ''"
				:errorMessage="values.termDate.errorMessage"
				mandatory
				@change="handleTermDateChange"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormDatePicker from "@/components/Inputs/FormDatePicker.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";

export default defineComponent({
	name: "ListFormStep1",
	components: {
		FormInputText,
		FormDatePicker,
		FormInputToggle,
	},
	props: {
		values: {
			type: Object,
		},
	},
	setup(props, context) {
		const handleTitleChange = (title: string) => {
			const values = {
				...props.values,
				title: {
					...props.values?.title,
					errorMessage: "",
					value: title,
				},
			};
			context.emit("change", values);
		};

		const handleDescriptionChange = (description: string) => {
			const values = {
				...props.values,
				description: {
					...props.values?.description,
					errorMessage: "",
					value: description,
				},
			};
			context.emit("change", values);
		};

		const handleActivateTermDateChange = (activateTermDate: boolean) => {
			const values = {
				...props.values,
				activateTermDate,
			};
			context.emit("change", values);
		};

		const handleTermDateChange = (termDate: string) => {
			const values = {
				...props.values,
				termDate: {
					...props.values?.termDate,
					errorMessage: "",
					value: termDate,
				},
			};
			context.emit("change", values);
		};

		return {
			handleTitleChange,
			handleDescriptionChange,
			handleActivateTermDateChange,
			handleTermDateChange,
		};
	},
	emits: ["change"],
});
</script>
