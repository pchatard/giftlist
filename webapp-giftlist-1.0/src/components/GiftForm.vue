<template>
	<div class="flex flex-col">
		<form class="p-4 flex flex-col divide-y my-4">
			<div class="grid grid-cols-6 gap-4 mb-4">
				<InputText
					class="col-span-2"
					:label="giftFormData.title.label"
					:value="giftFormData.title.value"
					:placeholder="giftFormData.title.placeholder"
					:helper-text="giftFormData.title.helperText"
					:is-error="giftFormData.title.errorMessage !== ''"
					:error-message="giftFormData.title.errorMessage"
					:mandatory="giftFormData.title.mandatory"
					reset
					@change="(title: string) => dispatch('changeGiftTitle', title)"
				>
					<div class="mr-4">
						<GiftIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputText>

				<InputToggle
					class="col-span-2 self-center"
					:label="giftFormData.isFavorite.label"
					:value="giftFormData.isFavorite.value"
					:helper-text="giftFormData.isFavorite.helperText"
					@change="(isFavorite: boolean) => dispatch('changeGiftIsFavorite', isFavorite)"
				>
					<div class="mr-4">
						<HeartIcon
							v-if="!giftFormData.isFavorite.value"
							class="w-5 h-5 text-indigo-600"
						/>
						<HeartIconFull v-else class="w-5 h-5 text-red-600" />
					</div>
				</InputToggle>

				<InputSelect
					class="col-start-1 col-span-2"
					:label="giftFormData.category.label"
					:value="giftFormData.category.value"
					:options="categories"
					:helper-text="giftFormData.category.helperText"
					:error-message="giftFormData.category.errorMessage"
					@change="(category: Record<string, unknown>) => dispatch('changeGiftCategory', category)"
				>
					<div class="mr-4">
						<FilterIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputSelect>

				<InputNumber
					class="col-span-1"
					:label="giftFormData.price.label"
					:value="giftFormData.price.value"
					:placeholder="giftFormData.price.placeholder"
					:helper-text="giftFormData.price.helperText"
					:error-message="giftFormData.price.errorMessage"
					:mandatory="giftFormData.price.mandatory"
					@change="(price: number) => dispatch('changeGiftPrice', price)"
				>
					<div class="mr-4">
						<CurrencyEuroIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputNumber>

				<InputLink
					class="col-span-full"
					:label="giftFormData.linkURL.label"
					:value="giftFormData.linkURL.value"
					:placeholder="giftFormData.linkURL.placeholder"
					:helper-text="giftFormData.linkURL.helperText"
					:error-message="giftFormData.linkURL.errorMessage"
					:mandatory="giftFormData.linkURL.mandatory"
					open
					reset
					@change="(linkURL: string) => dispatch('changeGiftLinkURL', linkURL)"
				>
					<div class="mr-4">
						<LinkIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputLink>
			</div>

			<div class="col-start-1 col-span-full flex flex-col gap-4">
				<InputToggle
					class="mt-4"
					:label="giftFormData.showDetails.label"
					:value="giftFormData.showDetails.value"
					:helper-text="giftFormData.showDetails.helperText"
					inline
					@change="(showDetails: boolean) => dispatch('changeGiftShowDetails', showDetails)"
				>
					<div class="mr-4">
						<InformationCircleIcon
							class="w-5 h-5"
							:class="giftFormData.showDetails.value ? 'text-indigo-600' : 'text-gray-600'"
						/>
					</div>
				</InputToggle>

				<div v-show="giftFormData.showDetails.value" class="flex gap-12">
					<InputText
						class="flex-1"
						:label="giftFormData.brand.label"
						:value="giftFormData.brand.value"
						:placeholder="giftFormData.brand.placeholder"
						:helper-text="giftFormData.brand.helperText"
						:error-message="giftFormData.brand.errorMessage"
						:mandatory="giftFormData.brand.mandatory"
						reset
						@change="(brand: string) => dispatch('changeGiftBrand', brand)"
					>
						<div class="mr-4">
							<TagIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
					<InputText
						class="flex-1"
						:label="giftFormData.color.label"
						:value="giftFormData.color.value"
						:placeholder="giftFormData.color.placeholder"
						:helper-text="giftFormData.color.helperText"
						:error-message="giftFormData.color.errorMessage"
						:mandatory="giftFormData.color.mandatory"
						reset
						@change="(color: string) => dispatch('changeGiftColor', color)"
					>
						<div class="mr-4">
							<ColorSwatchIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
					<InputText
						class="flex-2"
						:label="giftFormData.size.label"
						:value="giftFormData.size.value"
						:placeholder="giftFormData.size.placeholder"
						:helper-text="giftFormData.size.helperText"
						:error-message="giftFormData.size.errorMessage"
						:mandatory="giftFormData.size.mandatory"
						reset
						@change="(size: string) => dispatch('changeGiftSize', size)"
					>
						<div class="mr-4">
							<ChartBarIcon class="w-5 h-5 text-indigo-600" />
						</div>
					</InputText>
				</div>

				<InputText
					v-show="giftFormData.showDetails.value"
					class="col-start-1 col-span-full"
					:label="giftFormData.comments.label"
					:value="giftFormData.comments.value"
					:placeholder="giftFormData.comments.placeholder"
					:helper-text="giftFormData.comments.helperText"
					:error-message="giftFormData.comments.errorMessage"
					:mandatory="giftFormData.comments.mandatory"
					reset
					@change="(comments: string) => dispatch('changeGiftComments', comments)"
				>
					<div class="mr-4">
						<AnnotationIcon class="w-5 h-5 text-indigo-600" />
					</div>
				</InputText>
			</div>
		</form>
		<div class="flex justify-end gap-4">
			<GiftlistButton :btn-style="ButtonStyleEnum.danger" has-icon @click="$emit('cancel')">
				<template #icon>
					<XIcon />
				</template>
				{{ labels.gift.buttons.cancel }}
			</GiftlistButton>

			<GiftlistButton
				:btn-style="ButtonStyleEnum.primary"
				:loading="loading"
				has-icon
				@click="$emit('confirm')"
			>
				<template #icon>
					<CheckIcon />
				</template>
				{{ confirmText }}
			</GiftlistButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";

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
import { useStore } from "vuex";
import { GiftFormState } from "@/store/gift-form";
import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";

interface Props {
	action?: string;
	loading?: boolean;
	categories: Record<string, unknown>[];
}

const props = withDefaults(defineProps<Props>(), {
	action: "create",
	loading: false,
});

defineEmits<{
	(e: "cancel"): void;
	(e: "confirm"): void;
}>();

const { state, dispatch } = useStore();
const giftFormData: ComputedRef<GiftFormState> = computed(() => state.giftForm);

const confirmText = computed(() => {
	if (props.action === "create") {
		return labels.gift.buttons.create;
	}

	return labels.gift.buttons.save;
});
</script>
