<template>
	<div class="flex flex-col">
		<form class="p-4 flex flex-col divide-y my-4">
			<div class="grid grid-cols-6 gap-4 mb-4">
				<FormInputText
					class="col-span-2"
					:label="values.title.label"
					:value="values.title.value"
					:placeholder="values.title.placeholder"
					:helperText="values.title.helperText"
					:isError="values.title.errorMessage !== ''"
					:errorMessage="values.title.errorMessage"
					:mandatory="values.title.required"
					reset
					@change="(value) => handleChange('title', value)"
				/>
				<FormInputToggle
					class="col-span-2 self-center justify-self-center"
					:label="values.isFavorite.label"
					:value="values.isFavorite.value"
					:helperText="values.isFavorite.helperText"
					@change="(value) => handleChange('isFavorite', value)"
				/>

				<FormSelect
					class="col-start-1 col-span-1"
					:label="values.category.label"
					:value="values.category.value"
					:options="values.category.options"
					:helperText="values.category.helperText"
					:errorMessage="values.category.errorMessage"
					@change="(value) => handleChange('category', value)"
				/>

				<FormInputNumber
					class="col-span-1"
					:label="values.price.label"
					:value="values.price.value"
					:placeholder="values.price.placeholder"
					:helperText="values.price.helperText"
					:errorMessage="values.price.errorMessage"
					@change="(value) => handleChange('price', value)"
				/>

				<FormInputLink
					class="col-span-5"
					:label="values.link.label"
					:value="values.link.value"
					:placeholder="values.link.placeholder"
					:helperText="values.link.helperText"
					:errorMessage="values.link.errorMessage"
					reset
					@change="(value) => handleChange('link', value)"
				/>
			</div>

			<div class="col-start-1 col-span-full flex flex-col gap-4">
				<FormInputToggle
					class="mt-4"
					:label="values.showDetails.label"
					:value="values.showDetails.value"
					:helperText="values.showDetails.helperText"
					inline
					@change="(value) => handleChange('showDetails', value)"
				/>

				<div class="flex gap-4" v-show="values.showDetails.value">
					<FormInputText
						class="col-span-2"
						:label="values.brand.label"
						:value="values.brand.value"
						:placeholder="values.brand.placeholder"
						:helperText="values.brand.helperText"
						:errorMessage="values.brand.errorMessage"
						:mandatory="values.brand.required"
						reset
						@change="(value) => handleChange('brand', value)"
					/>
					<FormInputText
						class="col-span-2"
						:label="values.color.label"
						:value="values.color.value"
						:placeholder="values.color.placeholder"
						:helperText="values.color.helperText"
						:errorMessage="values.color.errorMessage"
						:mandatory="values.color.required"
						reset
						@change="(value) => handleChange('color', value)"
					/>
					<FormInputText
						class="col-span-1"
						:label="values.size.label"
						:value="values.size.value"
						:placeholder="values.size.placeholder"
						:helperText="values.size.helperText"
						:errorMessage="values.size.errorMessage"
						:mandatory="values.size.required"
						reset
						@change="(value) => handleChange('size', value)"
					/>
				</div>

				<FormInputText
					v-show="values.showDetails.value"
					class="col-start-1 col-span-full"
					:label="values.comments.label"
					:value="values.comments.value"
					:placeholder="values.comments.placeholder"
					:helperText="values.comments.helperText"
					:errorMessage="values.comments.errorMessage"
					:mandatory="values.comments.required"
					reset
					@change="(value) => handleChange('comments', value)"
				/>
			</div>
		</form>
		<div class="flex justify-end gap-4">
			<Button btnStyle="danger" hasIcon @click="$emit('cancel')">
				<template v-slot:icon>
					<XIcon />
				</template>
				{{ labels.gift.buttons.cancel }}
			</Button>

			<Button btnStyle="primary" hasIcon @click="$emit('confirm')">
				<template v-slot:icon>
					<CheckIcon />
				</template>
				{{ confirmText }}
			</Button>

			<Button
				v-if="action === 'create'"
				btnStyle="primary"
				hasIcon
				@click="$emit('confirm', true)"
			>
				<template v-slot:icon>
					<CheckIcon />
				</template>
				{{ labels.gift.buttons.createAnother }}
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import labels from "@/labels/fr/labels.json";

import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";
import FormInputLink from "@/components/Inputs/FormInputLink.vue";
import FormSelect from "@/components/Inputs/FormSelect.vue";
import Button from "@/components/Styled/Button.vue";

import { XIcon, CheckIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "GiftForm",
	components: {
		FormInputText,
		FormInputToggle,
		FormInputNumber,
		FormInputLink,
		FormSelect,
		Button,
		XIcon,
		CheckIcon,
	},
	props: {
		values: {
			type: Object,
			required: true,
		},
		action: {
			type: String,
			default: "create",
		},
	},
	setup(props, context) {
		const handleChange = (field: string, value: any) => {
			let fieldContent = { ...props.values[field], value };
			if (!["isFavorite", "showDetails"].includes(field)) {
				fieldContent.errorMessage = "";
			}

			const values = {
				...props.values,
				[field]: fieldContent,
			};
			context.emit("change", values);
		};

		const confirmText = computed(() => {
			if (props.action === "create") {
				return labels.gift.buttons.create;
			}

			return labels.gift.buttons.save;
		});

		return {
			labels,
			confirmText,
			handleChange,
		};
	},
	emits: ["change", "cancel", "confirm"],
});
</script>
