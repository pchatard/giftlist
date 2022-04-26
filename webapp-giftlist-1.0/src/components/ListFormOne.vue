<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<InputText
				class="col-span-1"
				:label="values.title.label"
				:value="values.title.value"
				:helper-text="values.title.helperText"
				:placeholder="values.title.placeholder"
				:is-error="values.title.errorMessage !== ''"
				:error-message="values.title.errorMessage"
				:mandatory="values.title.required"
				reset
				@change="handleTitleChange"
			>
				<div class="mr-4">
					<CollectionIcon class="w-5 h-5 text-indigo-600" />
				</div>
			</InputText>
			<InputText
				class="col-span-3 pt-4"
				:label="values.description.label"
				:value="values.description.value"
				:helper-text="values.description.helperText"
				:placeholder="values.description.placeholder"
				:is-error="values.description.errorMessage !== ''"
				:error-message="values.description.errorMessage"
				:mandatory="values.description.required"
				reset
				@change="handleDescriptionChange"
			>
				<div class="mr-4">
					<AnnotationIcon class="w-5 h-5 text-indigo-600" />
				</div>
			</InputText>
		</div>

		<div class="col-span-full flex items-center pt-4">
			<InputToggle
				class="col-span-full"
				:label="values.activateTermDate.label"
				:value="values.activateTermDate.value"
				inline
				:helper-text="values.activateTermDate.helperText"
				@change="handleActivateTermDateChange"
			>
				<div class="mr-4">
					<CalendarIcon
						class="w-5 h-5"
						:class="values.activateTermDate.value ? 'text-indigo-600' : 'text-gray-600'"
					/>
				</div>
			</InputToggle>
			<InputDate
				:disabled="!values.activateTermDate.value"
				class="col-span-full self-stretch mx-auto py-4 w-auto"
				:label="values.termDate.label"
				:value="values.termDate.value"
				:helper-text="values.termDate.helperText"
				:is-error="values.termDate.errorMessage !== ''"
				:error-message="values.termDate.errorMessage"
				mandatory
				@change="handleTermDateChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputDate from "@/components/InputDate.vue";
import InputText from "@/components/InputText.vue";
import InputToggle from "@/components/InputToggle.vue";
import { AnnotationIcon, CalendarIcon, CollectionIcon } from "@heroicons/vue/outline";

interface Props {
	values: Record<string, unknown>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "change", values: Record<string, unknown>): void;
}>();

const handleTitleChange = (title: string) => {
	const values = {
		...props.values,
		title: {
			...props.values?.title,
			errorMessage: "",
			value: title,
		},
	};
	emit("change", values);
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
	emit("change", values);
};

const handleActivateTermDateChange = (activateTermDate: boolean) => {
	const values = {
		...props.values,
		activateTermDate: {
			...props.values?.activateTermDate,
			value: activateTermDate,
		},
	};
	emit("change", values);
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
	emit("change", values);
};
</script>
