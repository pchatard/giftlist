import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdDTO } from "@/types/dto/GiftIdDTO";
import { AxiosResponse } from "axios";
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
	static async create(listId: string, gift: CreateGiftDTO): Promise<GiftIdDTO | undefined> {
		try {
			const apiResponse = await GiftlistAPI.post(API_PATH_GIFTS(listId), { ...gift });
			const giftId = apiResponse.data;
			return giftId;
		} catch (error) {
			console.log(error);
		}
	}

	// Get one list's gifts
	static async getAll(listId: string): Promise<GiftDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO[]> = await GiftlistAPI.get(
				API_PATH_GIFTS(listId)
			);
			const gifts = apiResponse.data;
			return gifts;
		} catch (error) {
			console.log(error);
		}
	}

	// Get a gift by its ID
	static async getOne(listId: string, giftId: string): Promise<GiftDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<GiftDTO> = await GiftlistAPI.get(
				API_PATH_GIFT(listId, giftId)
			);
			const gift = apiResponse.data;
			return gift;
		} catch (error) {
			console.log(error);
		}
	}

	// Delete a gift
	static async delete(listId: string, giftId: string): Promise<void> {
		try {
			await GiftlistAPI.delete(API_PATH_GIFT(listId, giftId));
		} catch (error) {
			console.log(error);
		}
	}

	// Edit a gift
	static async edit(listId: string, giftId: string, gift: GiftDTO): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_GIFT(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Hide a gift
	static async hide(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_HIDE(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Unhide a gift
	static async unhide(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_UNHIDE(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Fav a gift
	static async fav(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_FAV(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Unfav a gift
	static async unfav(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_UNFAV(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Book a gift
	static async book(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_BOOK(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Unbook a gift
	static async unbook(listId: string, giftId: string): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_UNBOOK(listId, giftId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}
}
