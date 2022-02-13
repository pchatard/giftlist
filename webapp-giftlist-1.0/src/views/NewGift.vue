<template>
	<DefaultLayout :title="labels.titles.newGift" back>
		<GiftForm
			action="create"
			:values="giftInformation"
			@change="handleGiftInformationChange"
			@cancel="cancel"
			@confirm="createGift"
		/>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import GiftForm from "@/components/Gift/GiftForm.vue";

import { GiftCategory } from "@/types/api/GiftCategory";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Gift } from "@/types/api/Gift";

export default defineComponent({
	name: "NewGift",
	components: {
		DefaultLayout,
		GiftForm,
	},
	setup() {
		const router = useRouter();
		const { dispatch } = useStore();

		const giftCategories: GiftCategory[] = [
			{ id: "x", name: "Type de cadeau" },
			{ id: "0", name: "Vêtements" },
			{ id: "1", name: "Chaussures" },
			{ id: "2", name: "High-Tech" },
			{ id: "3", name: "Evènements" },
		];

		const initializeData = () => {
			return {
				title: {
					label: "Titre",
					value: "",
					placeholder: "Cadeau",
					helperText: "Le nom de votre idée cadeau",
					errorMessage: "",
					required: true,
				},
				isFavorite: {
					label: "Favori",
					value: false,
					helperText: "Faire apparaître ce cadeau comme favori",
				},
				price: {
					label: "Prix",
					value: 0,
					placeholder: "15",
					helperText: "Le prix de votre idée cadeau",
					errorMessage: "",
					required: false,
				},
				category: {
					label: "Catégorie",
					value: giftCategories[0],
					options: giftCategories,
					helperText: "Sélectionner un type de cadeau",
					errorMessage: "",
				},
				link: {
					label: "Lien",
					value: "",
					placeholder: "https://www.google.com",
					helperText: "Copier un lien vers votre idée cadeau",
					errorMessage: "",
					required: false,
				},
				showDetails: {
					label: "Détails",
					value: false,
					helperText: "Marque, Taille, Couleur, Commentaires supplémentaires...",
				},
				brand: {
					label: "Marque",
					value: "",
					placeholder: "Nike, Adidas, etc",
					helperText: "La marque de votre idée cadeau",
					errorMessage: "",
					required: false,
				},
				size: {
					label: "Taille",
					value: "",
					placeholder: "M, 38, etc",
					helperText: "La taille de votre idée cadeau",
					errorMessage: "",
					required: false,
				},
				color: {
					label: "Couleur",
					value: "",
					placeholder: "Rouge, Noir",
					helperText: "La couleur de votre idée cadeau",
					errorMessage: "",
					required: false,
				},
				comments: {
					label: "Commentaires",
					value: "",
					placeholder: "Commentaires",
					helperText: "Ajouter des précisions supplémentaires",
					errorMessage: "",
					required: false,
				},
			};
		};

		const giftInformation = ref(initializeData());

		const cancel = () => {
			router.go(-1);
		};

		const createGift = (createOther = false) => {
			const listId = router.currentRoute.value.params.id;
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
			dispatch("createGift", gift)
				.then(() => {
					if (createOther) {
						giftInformation.value = initializeData();
					} else {
						// Redirect to list
						router.push("/app/lists/" + listId);
					}
				})
				.catch((error) => {
					console.log(error);
				});
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
		};
	},
});
</script>
