<template>
	<DefaultLayout title="Nouveau cadeau">
		<div class="flex flex-col">
			<form class="p-4 flex flex-col divide-y my-4">
				<div class="grid grid-cols-6 gap-4 mb-4">
					<FormInputText
						class="col-span-2"
						:label="giftInformation.title.label"
						:value="giftInformation.title.value"
						:placeholder="giftInformation.title.placeholder"
						:helperText="giftInformation.title.helperText"
						:isError="giftInformation.title.errorMessage !== ''"
						:errorMessage="giftInformation.title.errorMessage"
						:mandatory="giftInformation.title.required"
						reset
						@change="(value) => handleGiftInformationChange('title', value)"
					/>
					<FormInputToggle
						class="col-span-2 self-center justify-self-center"
						:label="giftInformation.isFavorite.label"
						:value="giftInformation.isFavorite.value"
						:helperText="giftInformation.isFavorite.helperText"
						@change="(value) => handleGiftInformationChange('isFavorite', value)"
					/>

					<FormSelect
						class="col-start-1 col-span-1"
						:label="giftInformation.category.label"
						:value="giftInformation.category.value"
						:options="giftInformation.category.options"
						:helperText="giftInformation.category.helperText"
						:errorMessage="giftInformation.category.errorMessage"
						@change="(value) => handleGiftInformationChange('category', value)"
					/>

					<FormInputNumber
						class="col-span-1"
						:label="giftInformation.price.label"
						:value="giftInformation.price.value"
						:placeholder="giftInformation.price.placeholder"
						:helperText="giftInformation.price.helperText"
						:errorMessage="giftInformation.price.errorMessage"
						@change="(value) => handleGiftInformationChange('price', value)"
					/>

					<FormInputLink
						class="col-span-5"
						:label="giftInformation.link.label"
						:value="giftInformation.link.value"
						:placeholder="giftInformation.link.placeholder"
						:helperText="giftInformation.link.helperText"
						:errorMessage="giftInformation.link.errorMessage"
						reset
						@change="(value) => handleGiftInformationChange('link', value)"
					/>
				</div>

				<div class="col-start-1 col-span-full flex flex-col gap-4">
					<FormInputToggle
						class="mt-4"
						:label="giftInformation.showDetails.label"
						:value="giftInformation.showDetails.value"
						:helperText="giftInformation.showDetails.helperText"
						inline
						@change="(value) => handleGiftInformationChange('showDetails', value)"
					/>

					<div class="flex gap-4" v-show="giftInformation.showDetails.value">
						<FormInputText
							class="col-span-2"
							:label="giftInformation.brand.label"
							:value="giftInformation.brand.value"
							:placeholder="giftInformation.brand.placeholder"
							:helperText="giftInformation.brand.helperText"
							:errorMessage="giftInformation.brand.errorMessage"
							:mandatory="giftInformation.brand.required"
							reset
							@change="(value) => handleGiftInformationChange('brand', value)"
						/>
						<FormInputText
							class="col-span-2"
							:label="giftInformation.color.label"
							:value="giftInformation.color.value"
							:placeholder="giftInformation.color.placeholder"
							:helperText="giftInformation.color.helperText"
							:errorMessage="giftInformation.color.errorMessage"
							:mandatory="giftInformation.color.required"
							reset
							@change="(value) => handleGiftInformationChange('color', value)"
						/>
						<FormInputText
							class="col-span-1"
							:label="giftInformation.size.label"
							:value="giftInformation.size.value"
							:placeholder="giftInformation.size.placeholder"
							:helperText="giftInformation.size.helperText"
							:errorMessage="giftInformation.size.errorMessage"
							:mandatory="giftInformation.size.required"
							reset
							@change="(value) => handleGiftInformationChange('size', value)"
						/>
					</div>

					<FormInputText
						v-show="giftInformation.showDetails.value"
						class="col-start-1 col-span-full"
						:label="giftInformation.comments.label"
						:value="giftInformation.comments.value"
						:placeholder="giftInformation.comments.placeholder"
						:helperText="giftInformation.comments.helperText"
						:errorMessage="giftInformation.comments.errorMessage"
						:mandatory="giftInformation.comments.required"
						reset
						@change="(value) => handleGiftInformationChange('comments', value)"
					/>
				</div>
			</form>
			<div class="flex justify-end gap-4">
				<Button btnStyle="danger" hasIcon @click="cancel">
					<template v-slot:icon>
						<XIcon />
					</template>
					Annuler
				</Button>
				<Button btnStyle="primary" hasIcon @click="createGift">
					<template v-slot:icon>
						<CheckIcon />
					</template>
					Valider
				</Button>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Button from "@/components/Styled/Button.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import FormInputNumber from "@/components/Inputs/FormInputNumber.vue";
import FormInputLink from "@/components/Inputs/FormInputLink.vue";
import FormSelect from "@/components/Inputs/FormSelect.vue";

import { XIcon, CheckIcon } from "@heroicons/vue/outline";
import { GiftCategory } from "@/types/api/GiftCategory";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Gift } from "@/types/api/Gift";

export default defineComponent({
	name: "NewGift",
	components: {
		DefaultLayout,
		Button,
		XIcon,
		CheckIcon,
		FormInputLink,
		FormInputNumber,
		FormInputText,
		FormInputToggle,
		FormSelect,
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
		const giftInformation = ref({
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
		});

		const cancel = () => {
			router.go(-1);
		};

		const createGift = () => {
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
				giftInformation.value.title.errorMessage = "Ce champ est requis";
				validate = false;
			}

			return validate;
		};

		const handleGiftInformationChange = (field: string, value: any) => {
			switch (field) {
				case "title":
					giftInformation.value.title.value = value;
					giftInformation.value.title.errorMessage = "";
					return;
				case "isFavorite":
					giftInformation.value.isFavorite.value = value;
					return;
				case "price":
					if (value < 0) {
						giftInformation.value.price.value = 0;
					}
					giftInformation.value.price.value = value;
					return;
				case "link":
					giftInformation.value.link.value = value;
					return;
				case "showDetails":
					giftInformation.value.showDetails.value = value;
					return;
				case "brand":
					giftInformation.value.brand.value = value;
					return;
				case "size":
					giftInformation.value.size.value = value;
					return;
				case "color":
					giftInformation.value.color.value = value;
					return;
				case "comments":
					giftInformation.value.comments.value = value;
					return;
				default:
					return;
			}
		};

		return {
			giftInformation,
			handleGiftInformationChange,
			cancel,
			createGift,
		};
	},
});
</script>
