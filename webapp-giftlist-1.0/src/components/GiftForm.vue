<template>
	<div class="flex flex-col">
		<form class="p-4 flex flex-col divide-y my-4">
			<div class="grid grid-cols-6 gap-4 mb-4">
				<InputText
					class="col-span-2"
					:label="values.title.label"
					:value="values.title.value"
					:placeholder="values.title.placeholder"
					:helper-text="values.title.helperText"
					:is-error="values.title.errorMessage !== ''"
					:error-message="values.title.errorMessage"
					:mandatory="values.title.required"
					reset
					@change="(value) => handleChange('title', value)"
				>
					<div class="mr-4">
						<GiftIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputText>

				<InputToggle
					class="col-span-2 self-center"
					:label="values.isFavorite.label"
					:value="values.isFavorite.value"
					:helper-text="values.isFavorite.helperText"
					@change="(value) => handleChange('isFavorite', value)"
				>
					<div class="mr-4">
						<HeartIcon v-if="!values.isFavorite.value" class="w-5 h-5 text-indigo-600" />
						<HeartIconFull v-else class="w-5 h-5 text-red-600" />
					</div>
				</InputToggle>

				<InputSelect
					class="col-start-1 col-span-2"
					:label="values.category.label"
					:value="values.category.value"
					:options="values.category.options"
					:helper-text="values.category.helperText"
					:error-message="values.category.errorMessage"
					@change="(value) => handleChange('category', value)"
				>
					<div class="mr-4">
						<FilterIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputSelect>

				<InputNumber
					class="col-span-1"
					:label="values.price.label"
					:value="values.price.value"
					:placeholder="values.price.placeholder"
					:helper-text="values.price.helperText"
					:error-message="values.price.errorMessage"
					@change="(value) => handleChange('price', value)"
				>
					<div class="mr-4">
						<CurrencyEuroIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputNumber>

				<InputLink
					class="col-span-full"
					:label="values.link.label"
					:value="values.link.value"
					:placeholder="values.link.placeholder"
					:helper-text="values.link.helperText"
					:error-message="values.link.errorMessage"
					open
					reset
					@change="(value) => handleChange('link', value)"
				>
					<div class="mr-4">
						<LinkIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputLink>
			</div>

			<div class="col-start-1 col-span-full flex flex-col gap-4">
				<InputToggle
					class="mt-4"
					:label="values.showDetails.label"
					:value="values.showDetails.value"
					:helper-text="values.showDetails.helperText"
					inline
					@change="(value) => handleChange('showDetails', value)"
				>
					<div class="mr-4">
						<InformationCircleIcon
							class="w-5 h-5"
							:class="values.showDetails.value ? 'text-indigo-600' : 'text-gray-600'"
						/>
					</div>
				</InputToggle>

				<div class="flex gap-12" v-show="values.showDetails.value">
					<InputText
						class="flex-1"
						:label="values.brand.label"
						:value="values.brand.value"
						:placeholder="values.brand.placeholder"
						:helper-text="values.brand.helperText"
						:error-message="values.brand.errorMessage"
						:mandatory="values.brand.required"
						reset
						@change="(value) => handleChange('brand', value)"
					>
						<div class="mr-4">
							<TagIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
					<InputText
						class="flex-1"
						:label="values.color.label"
						:value="values.color.value"
						:placeholder="values.color.placeholder"
						:helper-text="values.color.helperText"
						:error-message="values.color.errorMessage"
						:mandatory="values.color.required"
						reset
						@change="(value) => handleChange('color', value)"
					>
						<div class="mr-4">
							<ColorSwatchIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
					<InputText
						class="flex-2"
						:label="values.size.label"
						:value="values.size.value"
						:placeholder="values.size.placeholder"
						:helper-text="values.size.helperText"
						:error-message="values.size.errorMessage"
						:mandatory="values.size.required"
						reset
						@change="(value) => handleChange('size', value)"
					>
						<div class="mr-4">
							<ChartBarIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
				</div>

				<InputText
					v-show="values.showDetails.value"
					class="col-start-1 col-span-full"
					:label="values.comments.label"
					:value="values.comments.value"
					:placeholder="values.comments.placeholder"
					:helper-text="values.comments.helperText"
					:error-message="values.comments.errorMessage"
					:mandatory="values.comments.required"
					reset
					@change="(value) => handleChange('comments', value)"
				>
					<div class="mr-4">
						<AnnotationIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputText>
			</div>
		</form>
		<div class="flex justify-end gap-4">
			<GiftlistButton btn-style="danger" has-icon @click="$emit('cancel')">
				<template #icon>
					<XIcon />
				</template>
				{{ labels.gift.buttons.cancel }}
			</GiftlistButton>

			<GiftlistButton btn-style="primary" :loading="loading" has-icon @click="$emit('confirm')">
				<template #icon>
					<CheckIcon />
				</template>
				{{ confirmText }}
			</GiftlistButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import labels from "@/labels/fr/labels.json";

import GiftlistButton from "@/components/GiftlistButton.vue";
import InputLink from "@/components/InputLink.vue";
import InputNumber from "@/components/InputNumber.vue";
import InputSelect from "@/components/InputSelect.vue";
import InputText from "@/components/InputText.vue";
import InputToggle from "@/components/InputToggle.vue";

import {
	AnnotationIcon,
	ChartBarIcon,
	CheckIcon,
	ColorSwatchIcon,
	CurrencyEuroIcon,
	FilterIcon,
	GiftIcon,
	HeartIcon,
	InformationCircleIcon,
	LinkIcon,
	TagIcon,
	XIcon,
} from "@heroicons/vue/outline";
import { HeartIcon as HeartIconFull } from "@heroicons/vue/solid";

interface Props {
	values: Record<string, unknown>;
	action?: string;
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	action: "create",
	loading: false,
});

const emit = defineEmits<{
	(e: "change", values: Record<string, unknown>): void;
	(e: "cancel"): void;
	(e: "confirm"): void;
}>();

const handleChange = (field: string, value: any) => {
	const fieldContent = { ...props.values[field], value };
	if (!["isFavorite", "showDetails"].includes(field)) {
		fieldContent.errorMessage = "";
	}

	const values = {
		...props.values,
		[field]: fieldContent,
	};
	emit("change", values);
};

const confirmText = computed(() => {
	if (props.action === "create") {
		return labels.gift.buttons.create;
	}

	return labels.gift.buttons.save;
});
</script>
