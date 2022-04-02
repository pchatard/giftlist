import { AxiosError, AxiosResponse } from "axios";

import router from "@/router";
import { APIStatusCodeEnum } from "@/types/APIStatusCodeEnum";
import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdDTO } from "@/types/dto/GiftIdDTO";
import { PartialGiftDTO } from "@/types/dto/PartialGiftDTO";
import { Auth0Client } from "@auth0/auth0-spa-js";

import GiftlistAPI from "./GiftlistAPI";

const API_PATH_GIFTS = (listId: string) => `/lists/${listId}/gifts`;
const API_PATH_GIFT = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}`;
const API_PATH_HIDE = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/hide`;
const API_PATH_UNHIDE = (listId: string, giftId: string) =>
	`/lists/${listId}/gifts/${giftId}/unhide`;
const API_PATH_FAV = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/fav`;
const API_PATH_UNFAV = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/unfav`;
const API_PATH_BOOK = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/book`;
const API_PATH_UNBOOK = (listId: string, giftId: string) =>
	`/lists/${listId}/gifts/${giftId}/unbook`;

export default class Gifts {
	// Create a gift
	// Possible Errors: 401, 422
	static async create(
		auth: Auth0Client,
		listId: string,
		gift: CreateGiftDTO
	): Promise<GiftIdDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftIdDTO> | undefined = await GiftlistAPI.post(
				auth,
				API_PATH_GIFTS(listId),
				{ ...gift }
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar("Une erreur est survenue lors de la création du cadeau.");
			}
		}
	}

	// Get one list's gifts
	// Possible Errors: 401, 422
	static async getAll(auth: Auth0Client, listId: string): Promise<GiftDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO[]> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_GIFTS(listId),
				{},
				true
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				router.push("/app/error");
			}
		}
	}

	// Get a gift by its ID
	// Possible Errors: 401, 422
	static async getOne(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<GiftDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_GIFT(listId, giftId),
				{},
				true
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				router.push("/app/error");
			}
		}
	}

	// Delete a gift
	// Possible Errors: 401, 422
	static async delete(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_GIFT(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la suppression du cadeau."
				);
			}
		}
	}

	// Edit a gift
	// Possible Errors: 401, 422
	static async edit(
		auth: Auth0Client,
		listId: string,
		giftId: string,
		gift: PartialGiftDTO
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_GIFT(listId, giftId), {
				...gift,
			});

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification du cadeau."
				);
			}
		}
	}

	// Hide a gift
	// Possible Errors: 401, 422
	static async hide(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_HIDE(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification du cadeau."
				);
			}
		}
	}

	// Unhide a gift
	// Possible Errors: 401, 422
	static async unhide(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNHIDE(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification du cadeau."
				);
			}
		}
	}

	// Fav a gift
	// Possible Errors: 401, 422
	static async fav(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_FAV(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification du cadeau."
				);
			}
		}
	}

	// Unfav a gift
	// Possible Errors: 401, 422
	static async unfav(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNFAV(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification du cadeau."
				);
			}
		}
	}

	// Book a gift
	// Possible Errors: 401, 422
	static async book(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_BOOK(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la réservation du cadeau."
				);
			}
		}
	}

	// Unbook a gift
	// Possible Errors: 401, 422
	static async unbook(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNBOOK(listId, giftId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de l'annulation de la réservation du cadeau."
				);
			}
		}
	}
}
