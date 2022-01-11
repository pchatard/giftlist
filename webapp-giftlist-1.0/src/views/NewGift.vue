<template>
	<DefaultLayout title="Nouveau cadeau">
		<div class="flex flex-col">
			<form class="grid grid-cols-3 gap-4 my-4">
				<div class="col-span-1">
					<FormInputText
						:label="giftInformation.title.label"
						:value="giftInformation.title.value"
						:placeholder="giftInformation.title.placeholder"
						:helperText="giftInformation.title.helperText"
						:errorMessage="giftInformation.title.errorMessage"
						:mandatory="giftInformation.title.required"
						reset
						@change="(value) => handleGiftInformationChange('title', value)"
					/>
				</div>
				<div class="col-span-1 self-center justify-self-center">
					<FormInputToggle
						:label="giftInformation.isFavorite.label"
						:value="giftInformation.isFavorite.value"
						:helperText="giftInformation.isFavorite.helperText"
						inline
						@change="(value) => handleGiftInformationChange('isFavorite', value)"
					/>
				</div>
				<div class="col-start-1">
					<FormSelect
						:label="giftInformation.category.label"
						:value="giftInformation.category.value"
						:options="giftInformation.category.options"
						:helperText="giftInformation.category.helperText"
						:errorMessage="giftInformation.category.errorMessage"
						@change="(value) => handleGiftInformationChange('category', value)"
					/>
				</div>
				<div class="col-start-1">
					<FormInputNumber
						:label="giftInformation.price.label"
						:value="giftInformation.price.value"
						:placeholder="giftInformation.price.placeholder"
						:helperText="giftInformation.price.helperText"
						:errorMessage="giftInformation.price.errorMessage"
						@change="(value) => handleGiftInformationChange('price', value)"
					/>
				</div>
				<div class="col-span-full">
					<FormInputLink
						:label="giftInformation.link.label"
						:value="giftInformation.link.value"
						:placeholder="giftInformation.link.placeholder"
						:helperText="giftInformation.link.helperText"
						:errorMessage="giftInformation.link.errorMessage"
						reset
						@change="(value) => handleGiftInformationChange('link', value)"
					/>
				</div>
				<div class="col-span-full grid grid-cols-3 gap-4">
					<div>
						<FormInputText
							:label="giftInformation.brand.label"
							:value="giftInformation.brand.value"
							:placeholder="giftInformation.brand.placeholder"
							:helperText="giftInformation.brand.helperText"
							:errorMessage="giftInformation.brand.errorMessage"
							:mandatory="giftInformation.brand.required"
							reset
							@change="(value) => handleGiftInformationChange('brand', value)"
						/>
					</div>
					<div>
						<FormInputText
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
					<div>
						<FormInputText
							:label="giftInformation.color.label"
							:value="giftInformation.color.value"
							:placeholder="giftInformation.color.placeholder"
							:helperText="giftInformation.color.helperText"
							:errorMessage="giftInformation.color.errorMessage"
							:mandatory="giftInformation.color.required"
							reset
							@change="(value) => handleGiftInformationChange('color', value)"
						/>
					</div>
				</div>
			</form>
			<div class="flex justify-between">
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
		});

		const cancel = () => {
			router.go(-1);
		};

		const createGift = () => {
			const listId = router.currentRoute.value.params.id;
			// Validate fields
			// Call store action
			dispatch("createGift", giftInformation.value)
				.then(() => {
					router.push("/app/lists/" + listId);
				})
				.catch((error) => {
					console.log(error);
				});
			// Redirect to list
		};

		const handleGiftInformationChange = (field: string, value: any) => {
			switch (field) {
				case "title":
					giftInformation.value.title.value = value;
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
				case "brand":
					giftInformation.value.brand.value = value;
					return;
				case "size":
					giftInformation.value.size.value = value;
					return;
				case "color":
					giftInformation.value.color.value = value;
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
