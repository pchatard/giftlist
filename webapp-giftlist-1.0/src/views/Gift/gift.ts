import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import GiftForm from "@/components/Gift/GiftForm.vue";
import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import labels from "@/labels/fr/labels.json";
import { Gift } from "@/types/api/Gift";
import { GiftCategory } from "@/types/api/GiftCategory";
import { TrashIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Gift",
	components: {
		DefaultLayout,
		GiftForm,
		Button,
		TrashIcon,
	},
	setup() {
		const router = useRouter();
		const { dispatch } = useStore();
		const giftName = "Cadeau";
		const listName = "Ma liste";
		const listId = router.currentRoute.value.params.id;

		const giftCategories: GiftCategory[] = [
			{ id: "x", name: "Type de cadeau" },
			{ id: "0", name: "Vêtements" },
			{ id: "1", name: "Chaussures" },
			{ id: "2", name: "High-Tech" },
			{ id: "3", name: "Evènements" },
		];
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

		const handleGiftInformationChange = (values: any) => {
			giftInformation.value = values;
		};

		const cancel = () => {
			router.go(-1);
		};

		const deleteGift = () => {
			console.log("deleteGift");
			router.go(-1);
		};

		const saveGiftChanges = () => {
			// Validate fields
			if (!validateGiftFields()) {
				return;
			}

			// Format giftInformation
			const gift: Gift = {
				title: giftInformation.value.title.value,
				isFavorite: giftInformation.value.isFavorite.value,
				category: giftInformation.value.category.value,
				price: giftInformation.value.price.value,
				link: giftInformation.value.link.value,
				brand: giftInformation.value.brand.value,
				color: giftInformation.value.color.value,
				size: giftInformation.value.size.value,
				comments: giftInformation.value.comments.value,
				isBooked: false,
			};

			// Call store action
			dispatch("updateGift", gift)
				.then(() => {
					// Redirect to list
					router.push("/app/lists/" + listId);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const validateGiftFields = (): boolean => {
			let validate = true;

			if (!giftInformation.value.title.value) {
				giftInformation.value.title.errorMessage = labels.gift.inputs.title.errors.mandatory;
				validate = false;
			}

			return validate;
		};

		return {
			labels,
			giftName,
			listName,
			listId,
			giftInformation,
			handleGiftInformationChange,
			cancel,
			deleteGift,
			saveGiftChanges,
		};
	},
});
