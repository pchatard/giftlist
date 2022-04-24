<template>
	<DefaultLayout :title="labels.titles.newGift" back>
		<GiftForm
			action="create"
			:loading="buttonIsLoading"
			:values="giftInformation"
			@change="handleGiftInformationChange"
			@cancel="cancel"
			@confirm="createGift"
		/>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftForm from "@/components/GiftForm.vue";
import labels from "@/labels/fr/labels.json";
import { GiftCategory } from "@/types/api/GiftCategory";
import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { CreateGiftPayload } from "@/types/payload/CreateGiftPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";

export default defineComponent({
	name: "NewGiftView",
	components: {
		DefaultLayout,
		GiftForm,
	},
	setup() {
		/******** Basic imports ********/
		const router = useRouter();
		const { dispatch } = useStore();
		const auth = inject("Auth") as Auth0Client;

		/******** Static imports ********/
		const listId = router.currentRoute.value.params.id as string;
		const giftCategories: GiftCategory[] = [
			{ id: "x", name: "Général" },
			{ id: "0", name: "Vêtements" },
			{ id: "1", name: "Chaussures" },
			{ id: "2", name: "High-Tech" },
			{ id: "3", name: "Evènements" },
		];

		/******** Reactive data ********/
		const buttonIsLoading = ref(false);
		const giftInformation = ref({
			title: {
				label: labels.gift.inputs.title.label,
				value: "",
				placeholder: labels.gift.inputs.title.placeholder,
				helperText: labels.gift.inputs.title.helperText,
				errorMessage: "",
				required: true,
			},
			isFavorite: {
				label: labels.gift.inputs.isFavorite.label,
				value: false,
				helperText: labels.gift.inputs.isFavorite.helperText,
			},
			price: {
				label: labels.gift.inputs.price.label,
				value: 0,
				placeholder: labels.gift.inputs.price.placeholder,
				helperText: labels.gift.inputs.price.helperText,
				errorMessage: "",
				required: false,
			},
			category: {
				label: labels.gift.inputs.category.label,
				value: giftCategories[0],
				options: giftCategories,
				helperText: labels.gift.inputs.category.helperText,
				errorMessage: "",
			},
			link: {
				label: labels.gift.inputs.link.label,
				value: "",
				placeholder: labels.gift.inputs.link.placeholder,
				helperText: labels.gift.inputs.link.helperText,
				errorMessage: "",
				required: false,
			},
			showDetails: {
				label: labels.gift.inputs.showDetails.label,
				value: false,
				helperText: labels.gift.inputs.showDetails.helperText,
			},
			brand: {
				label: labels.gift.inputs.brand.label,
				value: "",
				placeholder: labels.gift.inputs.brand.placeholder,
				helperText: labels.gift.inputs.brand.helperText,
				errorMessage: "",
				required: false,
			},
			size: {
				label: labels.gift.inputs.size.label,
				value: "",
				placeholder: labels.gift.inputs.size.placeholder,
				helperText: labels.gift.inputs.size.helperText,
				errorMessage: "",
				required: false,
			},
			color: {
				label: labels.gift.inputs.color.label,
				value: "",
				placeholder: labels.gift.inputs.color.placeholder,
				helperText: labels.gift.inputs.color.helperText,
				errorMessage: "",
				required: false,
			},
			comments: {
				label: labels.gift.inputs.comments.label,
				value: "",
				placeholder: labels.gift.inputs.comments.placeholder,
				helperText: labels.gift.inputs.comments.helperText,
				errorMessage: "",
				required: false,
			},
		});

		/******** Computed data ********/
		const newGift = computed(() => {
			const gift: CreateGiftDTO = {
				title: giftInformation.value.title.value,
				isFavorite: giftInformation.value.isFavorite.value,
				isHidden: false,
				category: giftInformation.value.category.value.name,
				price: giftInformation.value.price.value
					? giftInformation.value.price.value
					: undefined,
				linkURL: giftInformation.value.link.value
					? giftInformation.value.link.value
					: undefined,
				brand:
					giftInformation.value.showDetails && giftInformation.value.brand.value
						? giftInformation.value.brand.value
						: undefined,
				color:
					giftInformation.value.showDetails && giftInformation.value.color.value
						? giftInformation.value.color.value
						: undefined,
				size:
					giftInformation.value.showDetails && giftInformation.value.size.value
						? giftInformation.value.size.value
						: undefined,
				comments:
					giftInformation.value.showDetails && giftInformation.value.comments.value
						? giftInformation.value.comments.value
						: undefined,
			};
			return gift;
		});

		/******** Fetch page data ********/

		/******** Methods ********/
		const cancel = () => {
			router.go(-1);
		};

		const createGift = async () => {
			buttonIsLoading.value = true;

			// Validate fields
			if (!validateGiftFields()) {
				buttonIsLoading.value = false;
				return;
			}

			const giftPayload: CreateGiftPayload = {
				auth,
				listId,
				gift: newGift.value,
			};
			const success = await dispatch("createGift", giftPayload);
			if (success) {
				router.go(-1);
			} else {
				buttonIsLoading.value = false;
			}
		};

		const validateGiftFields = (): boolean => {
			let validate = true;

			if (!giftInformation.value.title.value) {
				giftInformation.value.title.errorMessage = "Ce champ est requis";
				validate = false;
			}

			return validate;
		};

		const handleGiftInformationChange = (values: any) => {
			giftInformation.value = values;
		};

		return {
			labels,
			giftInformation,
			handleGiftInformationChange,
			cancel,
			createGift,
			buttonIsLoading,
		};
	},
});
</script>
