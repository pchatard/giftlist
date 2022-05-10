import {
	InputLinkData,
	InputNumberData,
	InputSelectData,
	InputTextData,
	InputToggleData,
} from "@/types/front/InputProps";
import { Module } from "vuex";
import { RootState } from ".";

import labels from "@/labels/fr/labels.json";
import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { PartialGiftDTO } from "@/types/dto/PartialGiftDTO";
import { GiftDTO } from "@/types/dto/GiftDTO";
import {
	validateGiftBrand,
	validateGiftColor,
	validateGiftComments,
	validateGiftLinkURL,
	validateGiftPrice,
	validateGiftSize,
	validateGiftTitle,
} from "@/helpers/gift-helpers";

export interface GiftFormState {
	title: InputTextData;
	isFavorite: InputToggleData;
	price: InputNumberData;
	category: InputSelectData;
	linkURL: InputLinkData;
	showDetails: InputToggleData;
	brand: InputTextData;
	size: InputTextData;
	color: InputTextData;
	comments: InputTextData;
}

const initGiftFormState = (): GiftFormState => {
	return {
		title: {
			label: labels.gift.inputs.title.label,
			value: "",
			placeholder: labels.gift.inputs.title.placeholder,
			helperText: labels.gift.inputs.title.helperText,
			errorMessage: "",
			mandatory: true,
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
			mandatory: false,
		},
		category: {
			label: labels.gift.inputs.category.label,
			value: { id: "x", name: "Général" },
			helperText: labels.gift.inputs.category.helperText,
			errorMessage: "",
		},
		linkURL: {
			label: labels.gift.inputs.link.label,
			value: "",
			placeholder: labels.gift.inputs.link.placeholder,
			helperText: labels.gift.inputs.link.helperText,
			errorMessage: "",
			mandatory: false,
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
			mandatory: false,
		},
		size: {
			label: labels.gift.inputs.size.label,
			value: "",
			placeholder: labels.gift.inputs.size.placeholder,
			helperText: labels.gift.inputs.size.helperText,
			errorMessage: "",
			mandatory: false,
		},
		color: {
			label: labels.gift.inputs.color.label,
			value: "",
			placeholder: labels.gift.inputs.color.placeholder,
			helperText: labels.gift.inputs.color.helperText,
			errorMessage: "",
			mandatory: false,
		},
		comments: {
			label: labels.gift.inputs.comments.label,
			value: "",
			placeholder: labels.gift.inputs.comments.placeholder,
			helperText: labels.gift.inputs.comments.helperText,
			errorMessage: "",
			mandatory: false,
		},
	};
};

export const giftForm: Module<GiftFormState, RootState> = {
	state: initGiftFormState,
	getters: {
		getGiftTitle: (state: GiftFormState): string => state.title.value.trim(),
		isGiftFavorite: (state: GiftFormState): boolean => state.isFavorite.value,
		getGiftPrice: (state: GiftFormState): number => state.price.value,
		getGiftCategory: (
			state: GiftFormState
		): Record<string, unknown>[] | Record<string, unknown> => state.category.value,
		getGiftLinkURL: (state: GiftFormState): string => state.linkURL.value,
		showGiftDetails: (state: GiftFormState): boolean => state.showDetails.value,
		getGiftBrand: (state: GiftFormState): string => state.brand.value.trim(),
		getGiftSize: (state: GiftFormState): string => state.size.value.trim(),
		getGiftColor: (state: GiftFormState): string => state.color.value.trim(),
		getGiftComments: (state: GiftFormState): string => state.comments.value.trim(),
		getCreateGiftData: (_state: GiftFormState, getters): CreateGiftDTO => {
			const newGift: CreateGiftDTO = {
				title: getters.getGiftTitle,
				isFavorite: getters.isGiftFavorite,
				isHidden: false,
				category: getters.getGiftCategory.name,
				price: getters.getGiftPrice || undefined,
				linkURL: getters.getGiftLinkURL || undefined,
				brand:
					getters.showGiftDetails && getters.getGiftBrand ? getters.getGiftBrand : undefined,
				color:
					getters.showGiftDetails && getters.getGiftColor ? getters.getGiftColor : undefined,
				size: getters.showGiftDetails && getters.getGiftSize ? getters.getGiftSize : undefined,
				comments:
					getters.showGiftDetails && getters.getGiftComments
						? getters.getGiftComments
						: undefined,
			};
			return newGift;
		},
		getPartialGiftData:
			(_state: GiftFormState, getters) =>
			(gift: GiftDTO): PartialGiftDTO => {
				const partialGift: PartialGiftDTO = {};

				if (getters.getGiftTitle !== gift.title) {
					partialGift.title = getters.getGiftTitle;
				}

				if (getters.isGiftFavorite !== gift.isFavorite) {
					partialGift.isFavorite = getters.isGiftFavorite;
				}

				if (getters.getGiftCategory !== gift.category) {
					partialGift.category = getters.getGiftCategory.name;
				}

				if (getters.getGiftPrice !== gift.price) {
					partialGift.price = getters.getGiftPrice;
				}

				if (getters.getGiftLinkURL !== gift.linkURL) {
					partialGift.linkURL = getters.getGiftLinkURL;
				}

				if (getters.getGiftBrand !== gift.brand) {
					partialGift.brand = getters.getGiftBrand;
				}

				if (getters.getGiftColor !== gift.color) {
					partialGift.color = getters.getGiftColor;
				}

				if (getters.getGiftSize !== gift.size) {
					partialGift.size = getters.getGiftSize;
				}

				if (getters.getGiftComments !== gift.comments) {
					partialGift.comments = getters.getGiftComments;
				}

				return partialGift;
			},
	},
	mutations: {
		SET_GIFT_STATE: (state: GiftFormState, initState: GiftFormState) => {
			Object.assign(state, initState);
		},
		SET_GIFT_TITLE: (state: GiftFormState, title: string) => {
			state.title.value = title;
			state.title.errorMessage = "";
		},
		SET_GIFT_IS_FAVORITE: (state: GiftFormState, isFavorite: boolean) => {
			state.isFavorite.value = isFavorite;
		},
		SET_GIFT_PRICE: (state: GiftFormState, price: number) => {
			state.price.value = price;
			state.price.errorMessage = "";
		},
		SET_GIFT_CATEGORY: (state: GiftFormState, category: Record<string, unknown>) => {
			state.category.value = category;
		},
		SET_GIFT_LINK_URL: (state: GiftFormState, linkURL: string) => {
			state.linkURL.value = linkURL;
			state.linkURL.errorMessage = "";
		},
		SET_GIFT_SHOW_DETAILS: (state: GiftFormState, showDetails: boolean) => {
			state.showDetails.value = showDetails;
		},
		SET_GIFT_BRAND: (state: GiftFormState, brand: string) => {
			state.brand.value = brand;
			state.brand.errorMessage = "";
		},
		SET_GIFT_SIZE: (state: GiftFormState, size: string) => {
			state.size.value = size;
			state.size.errorMessage = "";
		},
		SET_GIFT_COLOR: (state: GiftFormState, color: string) => {
			state.color.value = color;
			state.color.errorMessage = "";
		},
		SET_GIFT_COMMENTS: (state: GiftFormState, comments: string) => {
			state.comments.value = comments;
			state.comments.errorMessage = "";
		},
		SET_GIFT_TITLE_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.title.errorMessage = errorMessage;
		},
		SET_GIFT_PRICE_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.price.errorMessage = errorMessage;
		},
		SET_GIFT_LINK_URL_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.linkURL.errorMessage = errorMessage;
		},
		SET_GIFT_BRAND_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.brand.errorMessage = errorMessage;
		},
		SET_GIFT_SIZE_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.size.errorMessage = errorMessage;
		},
		SET_GIFT_COLOR_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.color.errorMessage = errorMessage;
		},
		SET_GIFT_COMMENTS_ERROR_MESSAGE: (state: GiftFormState, errorMessage: string) => {
			state.comments.errorMessage = errorMessage;
		},
	},
	actions: {
		initGiftFormState: ({ commit }) => {
			commit("SET_GIFT_STATE", initGiftFormState());
		},
		initGiftData: ({ commit }, initialGift: GiftDTO) => {
			commit("SET_GIFT_TITLE", initialGift.title);
			commit("SET_GIFT_IS_FAVORITE", initialGift.isFavorite);
			commit("SET_GIFT_PRICE", initialGift.price || 0);
			commit("SET_GIFT_CATEGORY", initialGift.category);
			commit("SET_GIFT_LINK_URL", initialGift.linkURL || "");
			commit(
				"SET_GIFT_SHOW_DETAILS",
				Boolean(
					initialGift.brand || initialGift.size || initialGift.color || initialGift.comments
				)
			);
			commit("SET_GIFT_BRAND", initialGift.brand || "");
			commit("SET_GIFT_SIZE", initialGift.size || "");
			commit("SET_GIFT_COLOR", initialGift.color || "");
			commit("SET_GIFT_COMMENTS", initialGift.comments || "");
		},
		changeGiftTitle: ({ commit }, title: string) => {
			commit("SET_GIFT_TITLE", title);
		},
		changeGiftIsFavorite: ({ commit }, isFavorite: boolean) => {
			commit("SET_GIFT_IS_FAVORITE", isFavorite);
		},
		changeGiftPrice: ({ commit }, price: number) => {
			commit("SET_GIFT_PRICE", price);
		},
		changeGiftCategory: ({ commit }, category: Record<string, unknown>) => {
			commit("SET_GIFT_CATEGORY", category);
		},
		changeGiftLinkURL: ({ commit }, linkURL: string) => {
			commit("SET_GIFT_LINK_URL", linkURL);
		},
		changeGiftShowDetails: ({ commit }, showDetails: boolean) => {
			commit("SET_GIFT_SHOW_DETAILS", showDetails);
		},
		changeGiftBrand: ({ commit }, brand: string) => {
			commit("SET_GIFT_BRAND", brand);
		},
		changeGiftSize: ({ commit }, size: string) => {
			commit("SET_GIFT_SIZE", size);
		},
		changeGiftColor: ({ commit }, color: string) => {
			commit("SET_GIFT_COLOR", color);
		},
		changeGiftComments: ({ commit }, comments: string) => {
			commit("SET_GIFT_COMMENTS", comments);
		},
		checkGiftData: ({ commit, getters }): boolean => {
			let validateGift = true;

			const giftTitleErrorMessage = validateGiftTitle(getters.getGiftTitle);
			if (giftTitleErrorMessage) {
				commit("SET_GIFT_TITLE_ERROR_MESSAGE", giftTitleErrorMessage);
				validateGift = false;
			}

			if (getters.getGiftPrice) {
				const giftPriceErrorMessage = validateGiftPrice(getters.getGiftPrice);
				if (giftPriceErrorMessage) {
					commit("SET_GIFT_PRICE_ERROR_MESSAGE", giftPriceErrorMessage);
					validateGift = false;
				}
			}

			if (getters.getGiftLinkURL) {
				const giftLinkURLErrorMessage = validateGiftLinkURL(getters.getGiftLinkURL);
				if (giftLinkURLErrorMessage) {
					commit("SET_GIFT_LINK_URL_ERROR_MESSAGE", giftLinkURLErrorMessage);
					validateGift = false;
				}
			}

			if (getters.showGiftDetails) {
				if (getters.getGiftBrand) {
					const giftBrandErrorMessage = validateGiftBrand(getters.getGiftBrand);
					if (giftBrandErrorMessage) {
						commit("SET_GIFT_BRAND_ERROR_MESSAGE", giftBrandErrorMessage);
						validateGift = false;
					}
				}

				if (getters.getGiftSize) {
					const giftSizeErrorMessage = validateGiftSize(getters.getGiftSize);
					if (giftSizeErrorMessage) {
						commit("SET_GIFT_SIZE_ERROR_MESSAGE", giftSizeErrorMessage);
						validateGift = false;
					}
				}

				if (getters.getGiftColor) {
					const giftColorErrorMessage = validateGiftColor(getters.getGiftColor);
					if (giftColorErrorMessage) {
						commit("SET_GIFT_COLOR_ERROR_MESSAGE", giftColorErrorMessage);
						validateGift = false;
					}
				}

				if (getters.getGiftComments) {
					const giftCommentsErrorMessage = validateGiftComments(getters.getGiftComments);
					if (giftCommentsErrorMessage) {
						commit("SET_GIFT_COMMENTS_ERROR_MESSAGE", giftCommentsErrorMessage);
						validateGift = false;
					}
				}
			}

			return validateGift;
		},
	},
};
