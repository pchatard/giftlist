<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<InputText
				class="col-span-1"
				:label="listFormData.title.label"
				:value="listFormData.title.value"
				:helper-text="listFormData.title.helperText"
				:placeholder="listFormData.title.placeholder"
				:is-error="listFormData.title.errorMessage !== ''"
				:error-message="listFormData.title.errorMessage"
				:mandatory="listFormData.title.mandatory"
				reset
				@change="(title: string) => dispatch('changeListTitle', title)"
			>
				<div class="mr-4">
					<CollectionIcon class="w-5 h-5 text-indigo-600" />
				</div>
			</InputText>
			<InputText
				class="col-span-3 pt-4"
				:label="listFormData.description.label"
				:value="listFormData.description.value"
				:helper-text="listFormData.description.helperText"
				:placeholder="listFormData.description.placeholder"
				:is-error="listFormData.description.errorMessage !== ''"
				:error-message="listFormData.description.errorMessage"
				:mandatory="listFormData.description.mandatory"
				reset
				@change="(description: string) => dispatch('changeListDescription', description)"
			>
				<div class="mr-4">
					<AnnotationIcon class="w-5 h-5 text-indigo-600" />
				</div>
			</InputText>
		</div>

		<div class="col-span-full flex items-center pt-4">
			<InputToggle
				class="col-span-full"
				:label="listFormData.hasClosureDate.label"
				:value="listFormData.hasClosureDate.value"
				inline
				:helper-text="listFormData.hasClosureDate.helperText"
				@change="(hasClosureDate: boolean) => dispatch('changeListHasClosureDate', hasClosureDate)"
			>
				<div class="mr-4">
					<CalendarIcon
						class="w-5 h-5"
						:class="listFormData.hasClosureDate.value ? 'text-indigo-600' : 'text-gray-600'"
					/>
				</div>
			</InputToggle>
			<InputDate
				:disabled="!listFormData.hasClosureDate.value"
				class="col-span-full self-stretch mx-auto py-4 w-auto"
				:label="listFormData.closureDate.label"
				:value="listFormData.closureDate.value"
				:helper-text="listFormData.closureDate.helperText"
				:is-error="listFormData.closureDate.errorMessage !== ''"
				:error-message="listFormData.closureDate.errorMessage"
				mandatory
				@change="(closureDate: string) => dispatch('changeListClosureDate', closureDate)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputDate from "@/components/InputDate.vue";
import InputText from "@/components/InputText.vue";
import InputToggle from "@/components/InputToggle.vue";
import { AnnotationIcon, CalendarIcon, CollectionIcon } from "@heroicons/vue/outline";
import { ListFormState } from "@/store/listForm";
import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
const listFormData: ComputedRef<ListFormState> = computed(() => state.listForm);
</script>
