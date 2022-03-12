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
	// Errors: 401, 422
	// listId dans CreateGiftDTO ?
	static async create(
		auth: Auth0Client,
		listId: string,
		gift: CreateGiftDTO
	): Promise<GiftIdDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftIdDTO> = await GiftlistAPI.post(
				auth,
				API_PATH_GIFTS(listId),
				{ ...gift }
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Get one list's gifts
	// Don't show isBooked if I own the gift
	// Errors: 401, 422
	static async getAll(auth: Auth0Client, listId: string): Promise<GiftDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO[]> = await GiftlistAPI.get(
				auth,
				API_PATH_GIFTS(listId)
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Get a gift by its ID
	// Get one list's gifts
	// Don't show isBooked if I own the gift
	// If gift does not exist, return something else than 401 ?
	// Errors: 401, 422
	static async getOne(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<GiftDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO> = await GiftlistAPI.get(
				auth,
				API_PATH_GIFT(listId, giftId)
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Delete a gift
	// Errors: 401, 422
	static async delete(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_GIFT(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Edit a gift
	// Tests : Remove listId from PartialGiftDTO
	// Errors: 401, 422
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

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Hide a gift
	// Errors: 401, 422
	static async hide(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_HIDE(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Unhide a gift
	// Errors: 401, 422
	static async unhide(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNHIDE(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Fav a gift
	// Errors: 401, 422
	static async fav(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_FAV(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Unfav a gift
	// Errors: 401, 422
	static async unfav(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNFAV(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Book a gift
	// Prevent a user from booking a gift belonging to a list he is the owner
	// Errors: 401, 422
	static async book(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_BOOK(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Unbook a gift
	// Prevent a user from booking a gift belonging to a list he is the owner
	// Errors: 401, 422
	static async unbook(
		auth: Auth0Client,
		listId: string,
		giftId: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNBOOK(listId, giftId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}
}
