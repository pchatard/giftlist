<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<FormInputText
				class="col-span-1"
				label="Titre"
				:value="values.title"
				@change="handleTitleChange"
				helperText="Le titre de votre nouvelle liste"
				placeholder="Mes 18 ans"
				reset
				:mandatory="true"
			/>
			<FormInputText
				class="col-span-3 pt-4"
				label="Description"
				:value="values.description"
				@change="handleDescriptionChange"
				helperText="Une rapide description de votre liste"
				placeholder="La wishlist de la majorité"
				reset
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
				class="col-span-1"
				label="Date d'échéance de votre liste"
				:value="values.termDate"
				@change="handleTermDateChange"
				helperText="La date avant laquelle on doit vous offrir vos cadeaux"
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
	name: "NewListStep1",
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
				title,
			};
			context.emit("change", values);
		};

		const handleDescriptionChange = (description: string) => {
			const values = {
				...props.values,
				description,
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
				termDate,
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
